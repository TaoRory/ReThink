import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getDb, profileById } from "./store";
import type { Profile, Role } from "./types";

const COOKIE = "rethink_session";
const SECRET = process.env.SESSION_SECRET ?? "rethink-voices-demo-secret";

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function sessionToken(userId: string): string {
  return `${userId}.${sign(userId)}`;
}

export function verifyToken(token: string | undefined): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const userId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(userId);
  if (sig.length !== expected.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return userId;
}

export async function getSessionUser(): Promise<Profile | null> {
  const jar = await cookies();
  const userId = verifyToken(jar.get(COOKIE)?.value);
  if (!userId) return null;
  return profileById(getDb(), userId) ?? null;
}

export async function setSession(userId: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, sessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

const ROLE_RANK: Record<Role, number> = {
  reader: 0,
  writer: 1,
  editor: 2,
  admin: 3,
};

export function atLeast(user: Profile | null, role: Role): boolean {
  if (!user) return false;
  return ROLE_RANK[user.role] >= ROLE_RANK[role];
}
