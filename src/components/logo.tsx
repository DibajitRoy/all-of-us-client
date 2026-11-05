import Image from "next/image";
import Link from "next/link";


const LOGO = "/images/logo-icon.png";

type LogoProps = {
  size?: "sm" | "lg";
  onDark?: boolean;
  showTagline?: boolean;
  taglineClassName?: string;
  href?: string | null;
};

export function Logo({
  size = "sm",
  onDark = false,
  showTagline = true,
  taglineClassName,
  href = "/",
}: LogoProps) {
  const lg = size === "lg";
  const px = lg ? 96 : 40;
  const usColor = onDark ? "#5FD3A9" : "#2FA67F";
  const tagVisibility = taglineClassName ?? (lg ? "block" : "hidden lg:block");

  // On dark backgrounds the icon turns white so it stays visible
  const iconTone = onDark ? "brightness-0 invert" : "dark:brightness-0 dark:invert";

  const content = (
    <span className={`inline-flex items-center ${lg ? "gap-5" : "gap-2.5"}`}>
      <Image
        src={LOGO}
        alt=""
        width={px}
        height={px}
        priority={!lg}
        className={`${lg ? "size-24" : "size-10"} object-contain ${iconTone}`}
      />

      <span className="flex flex-col">
        <span className={`font-bold leading-none tracking-tight ${lg ? "text-5xl" : "text-2xl"}`}>
          <span className={onDark ? "text-white" : "text-primary"}>All of </span>
          <span style={{ color: usColor }}>Us</span>
        </span>

        {showTagline && (
          <span
            className={`${tagVisibility} ${lg ? "mt-3 text-base" : "mt-1 text-[11px]"} font-medium leading-none ${
              onDark ? "text-white/75" : "text-muted-foreground"
            }`}
          >
            Together for a Better Community
          </span>
        )}

        {lg && showTagline && (
          <svg viewBox="0 0 260 14" aria-hidden="true" className="mt-2 h-3 w-64">
            <path d="M2 11 Q130 -3 258 11" fill="none" stroke={usColor} strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="All of Us, home">
      {content}
    </Link>
  );
}