import { Logo } from "@/components/logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-primary/10" />
      <div aria-hidden="true" className="absolute -left-24 -top-24 -z-10 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-28 -right-20 -z-10 size-[28rem] rounded-full bg-[#2FA67F]/15 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2">
        <div className="hidden flex-col items-start gap-6 md:flex">
          <Logo size="lg" href={null} />
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            Join a community that turns small actions into real change, one event at a time.
          </p>
        </div>

        <div className="rounded-2xl border bg-card/90 p-6 shadow-xl backdrop-blur sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}