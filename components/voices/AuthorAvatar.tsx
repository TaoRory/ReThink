import type { Profile } from "@/lib/voices/types";

export function AuthorAvatar({
  profile,
  size = 40,
}: {
  profile: Profile;
  size?: number;
}) {
  const initial = profile.displayName.trim().charAt(0).toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: `linear-gradient(135deg, hsl(${profile.avatarHue} 55% 42%), hsl(${(profile.avatarHue + 40) % 360} 60% 30%))`,
      }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
