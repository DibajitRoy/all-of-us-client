export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  center = false,
}: {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Tag className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</Tag>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}