export type Role = "reader" | "writer" | "editor" | "admin";
export type TopicStatus = "upcoming" | "open" | "closed" | "archived";
export type PieceStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "curated"
  | "published"
  | "archived";
export type LengthType = "short" | "long";

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  /** Demo-only plain password — production uses Supabase Auth (see web/supabase/) */
  password: string;
  bio: string;
  role: Role;
  isAlumni: boolean;
  /** hex color for the initial-letter avatar */
  avatarHue: number;
  createdAt: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  prompt: string;
  description: string;
  /** first day of the topic month, ISO */
  month: string;
  status: TopicStatus;
  createdAt: string;
}

export interface Piece {
  id: string;
  slug: string;
  topicId: string;
  authorId: string;
  title: string;
  /** markdown */
  body: string;
  excerpt: string;
  lengthType: LengthType;
  status: PieceStatus;
  isSpotlight: boolean;
  readingTimeMin: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: string;
  pieceId: string;
  userId: string;
  type: "clap";
}

export interface VoicesDb {
  profiles: Profile[];
  topics: Topic[];
  pieces: Piece[];
  reactions: Reaction[];
}

export const PIECE_STATUS_LABEL: Record<PieceStatus, string> = {
  draft: "Bản nháp",
  submitted: "Đã gửi",
  in_review: "Đang review",
  curated: "Đã tuyển chọn",
  published: "Đã xuất bản",
  archived: "Lưu trữ",
};

export const TOPIC_STATUS_LABEL: Record<TopicStatus, string> = {
  upcoming: "Sắp mở",
  open: "Đang mở",
  closed: "Đã đóng",
  archived: "Lưu trữ",
};
