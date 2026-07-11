"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  atLeast,
  clearSession,
  getSessionUser,
  setSession,
} from "@/lib/voices/auth";
import {
  getDb,
  makeExcerpt,
  readingTime,
  saveDb,
  slugify,
  uniqueSlug,
} from "@/lib/voices/store";
import type { LengthType, PieceStatus, TopicStatus } from "@/lib/voices/types";

function revalidateVoices() {
  revalidatePath("/voices", "layout");
}

/* ================= AUTH ================= */

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const db = getDb();
  const user = db.profiles.find(
    (u) => u.email.toLowerCase() === email && u.password === password
  );
  if (!user) {
    return { error: "Email hoặc mật khẩu chưa đúng. Thử lại nhé." };
  }
  await setSession(user.id);
  revalidateVoices();
  redirect(atLeast(user, "editor") ? "/voices/studio" : "/voices/dashboard");
}

export async function signupAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!displayName || !email || password.length < 6) {
    return {
      error: "Điền đủ tên, email và mật khẩu tối thiểu 6 ký tự nhé.",
    };
  }
  const db = getDb();
  if (db.profiles.some((u) => u.email.toLowerCase() === email)) {
    return { error: "Email này đã được đăng ký. Bạn đăng nhập nhé." };
  }
  const taken = new Set(db.profiles.map((u) => u.username));
  const username = uniqueSlug(slugify(displayName).replace(/-/g, "."), taken);
  const user = {
    id: randomUUID(),
    username,
    displayName,
    email,
    password,
    bio: "",
    role: "writer" as const,
    isAlumni: false,
    avatarHue: Math.floor(Math.random() * 360),
    createdAt: new Date().toISOString(),
  };
  db.profiles.push(user);
  saveDb(db);
  await setSession(user.id);
  revalidateVoices();
  redirect("/voices/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  revalidateVoices();
  redirect("/voices");
}

/* ================= WRITER ================= */

export async function savePieceAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await getSessionUser();
  if (!atLeast(user, "writer")) redirect("/voices/login");

  const id = String(formData.get("id") ?? "");
  const topicId = String(formData.get("topicId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const excerptRaw = String(formData.get("excerpt") ?? "").trim();
  const lengthType = (formData.get("lengthType") === "long"
    ? "long"
    : "short") as LengthType;
  const intent = String(formData.get("intent") ?? "draft"); // draft | submit

  const db = getDb();
  const topic = db.topics.find((t) => t.id === topicId);
  if (!title || !body) {
    return { error: "Bài viết cần có tiêu đề và nội dung." };
  }
  if (!topic || topic.status !== "open") {
    return { error: "Chủ đề này hiện không mở nhận bài." };
  }

  const now = new Date().toISOString();
  const status: PieceStatus = intent === "submit" ? "submitted" : "draft";

  if (id) {
    const piece = db.pieces.find((p) => p.id === id);
    if (!piece) return { error: "Không tìm thấy bài viết." };
    if (piece.authorId !== user!.id && !atLeast(user, "editor")) {
      return { error: "Bạn chỉ có thể sửa bài của chính mình." };
    }
    if (piece.status === "published") {
      return { error: "Bài đã xuất bản — liên hệ ban biên tập để chỉnh sửa." };
    }
    Object.assign(piece, {
      topicId,
      title,
      body,
      excerpt: excerptRaw || makeExcerpt(body),
      lengthType,
      status,
      readingTimeMin: readingTime(body),
      updatedAt: now,
    });
  } else {
    const taken = new Set(db.pieces.map((p) => p.slug));
    db.pieces.push({
      id: randomUUID(),
      slug: uniqueSlug(slugify(title), taken),
      topicId,
      authorId: user!.id,
      title,
      body,
      excerpt: excerptRaw || makeExcerpt(body),
      lengthType,
      status,
      isSpotlight: false,
      readingTimeMin: readingTime(body),
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  saveDb(db);
  revalidateVoices();
  redirect(
    intent === "submit" ? "/voices/dashboard?sent=1" : "/voices/dashboard"
  );
}

export async function clapAction(pieceId: string): Promise<void> {
  const user = await getSessionUser();
  if (!user) redirect("/voices/login");
  const db = getDb();
  const existing = db.reactions.findIndex(
    (r) => r.pieceId === pieceId && r.userId === user!.id && r.type === "clap"
  );
  if (existing >= 0) {
    db.reactions.splice(existing, 1);
  } else {
    db.reactions.push({
      id: randomUUID(),
      pieceId,
      userId: user!.id,
      type: "clap",
    });
  }
  saveDb(db);
  revalidateVoices();
}

/* ================= EDITOR / STUDIO ================= */

export async function setPieceStatusAction(
  pieceId: string,
  status: PieceStatus
): Promise<void> {
  const user = await getSessionUser();
  if (!atLeast(user, "editor")) redirect("/voices/login");
  const db = getDb();
  const piece = db.pieces.find((p) => p.id === pieceId);
  if (!piece) return;
  piece.status = status;
  piece.updatedAt = new Date().toISOString();
  if (status === "published" && !piece.publishedAt) {
    piece.publishedAt = new Date().toISOString();
  }
  if (status !== "published") {
    piece.isSpotlight = false;
  }
  saveDb(db);
  revalidateVoices();
}

export async function toggleSpotlightAction(pieceId: string): Promise<void> {
  const user = await getSessionUser();
  if (!atLeast(user, "editor")) redirect("/voices/login");
  const db = getDb();
  const piece = db.pieces.find((p) => p.id === pieceId);
  if (!piece || piece.status !== "published") return;
  piece.isSpotlight = !piece.isSpotlight;
  saveDb(db);
  revalidateVoices();
}

export async function createTopicAction(
  _prev: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const user = await getSessionUser();
  if (!atLeast(user, "editor")) redirect("/voices/login");

  const title = String(formData.get("title") ?? "").trim();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const month = String(formData.get("month") ?? "").trim(); // yyyy-MM
  const status = (formData.get("status") ?? "upcoming") as TopicStatus;

  if (!title || !prompt || !month) {
    return { error: "Chủ đề cần tiêu đề, lời mời viết và tháng diễn ra." };
  }

  const db = getDb();
  const taken = new Set(db.topics.map((t) => t.slug));
  db.topics.push({
    id: randomUUID(),
    slug: uniqueSlug(slugify(title), taken),
    title,
    prompt,
    description,
    month: `${month}-01`,
    status,
    createdAt: new Date().toISOString(),
  });
  saveDb(db);
  revalidateVoices();
  redirect("/voices/studio?tab=topics");
}

export async function setTopicStatusAction(
  topicId: string,
  status: TopicStatus
): Promise<void> {
  const user = await getSessionUser();
  if (!atLeast(user, "editor")) redirect("/voices/login");
  const db = getDb();
  const topic = db.topics.find((t) => t.id === topicId);
  if (!topic) return;
  topic.status = status;
  saveDb(db);
  revalidateVoices();
}
