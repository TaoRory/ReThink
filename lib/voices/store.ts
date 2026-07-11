import fs from "fs";
import path from "path";
import { buildSeed } from "./seed";
import type { Piece, Profile, Topic, VoicesDb } from "./types";

/**
 * Local JSON store for the Rethink Voices MVP.
 * Runs with zero external services; the production path is Supabase
 * (schema + RLS in web/supabase/). Swap happens behind these functions.
 *
 * On Vercel the project filesystem is read-only, so the store falls back to
 * /tmp — writes work per serverless instance but reset between deployments
 * and cold starts. Đây là chế độ demo; production thật dùng Supabase.
 */
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "rethink-voices")
  : path.join(process.cwd(), "data", "runtime");
const DATA_FILE = path.join(DATA_DIR, "voices.json");

function load(): VoicesDb {
  if (!fs.existsSync(DATA_FILE)) {
    const seed = buildSeed();
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) as VoicesDb;
}

export function getDb(): VoicesDb {
  return load();
}

export function saveDb(db: VoicesDb): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
}

/* ---------- helpers ---------- */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base || "bai-viet";
  let i = 2;
  while (taken.has(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function makeExcerpt(body: string, max = 180): string {
  const text = body
    .replace(/^#+\s.*$/gm, "")
    .replace(/[*_>`#\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/* ---------- queries ---------- */

export function publishedPieces(db: VoicesDb): Piece[] {
  return db.pieces
    .filter((p) => p.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function pieceBySlug(db: VoicesDb, slug: string): Piece | undefined {
  return db.pieces.find((p) => p.slug === slug);
}

export function topicBySlug(db: VoicesDb, slug: string): Topic | undefined {
  return db.topics.find((t) => t.slug === slug);
}

export function topicById(db: VoicesDb, id: string): Topic | undefined {
  return db.topics.find((t) => t.id === id);
}

export function profileById(db: VoicesDb, id: string): Profile | undefined {
  return db.profiles.find((u) => u.id === id);
}

export function profileByUsername(
  db: VoicesDb,
  username: string
): Profile | undefined {
  return db.profiles.find((u) => u.username === username);
}

export function clapCount(db: VoicesDb, pieceId: string): number {
  return db.reactions.filter((r) => r.pieceId === pieceId && r.type === "clap")
    .length;
}

export function hasClapped(
  db: VoicesDb,
  pieceId: string,
  userId: string | null
): boolean {
  if (!userId) return false;
  return db.reactions.some(
    (r) => r.pieceId === pieceId && r.userId === userId && r.type === "clap"
  );
}

export function currentOpenTopic(db: VoicesDb): Topic | undefined {
  return db.topics
    .filter((t) => t.status === "open")
    .sort((a, b) => b.month.localeCompare(a.month))[0];
}
