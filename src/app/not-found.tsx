import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="mt-4 text-muted-foreground">We could not find the page you were looking for.</p>
      <Link href="/" className={buttonVariants({ className: "mt-6 h-10 px-5" })}>Back to Home</Link>
    </main>
  );
}