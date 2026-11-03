import Image from "next/image";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2">
      <div className="hidden justify-center md:flex">
        <Image src="/logo.png" alt="All of Us" width={1536} height={1024} priority className="h-auto w-full max-w-md rounded-2xl bg-white" />
      </div>
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}