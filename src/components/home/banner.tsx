import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
            Community-driven social service
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Small Actions. <span className="text-primary">Big Changes.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Join hands with your neighbours. Find a service event near you, or organise
            your own, and help build a kinder city.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className={buttonVariants({ className: "h-11 px-6" })}>
              Explore Events <ArrowRight />
            </Link>
            <Link href="/create-event" className={buttonVariants({ variant: "outline", className: "h-11 px-6" })}>
              Create an Event
            </Link>
          </div>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/images/hero.jpg"
            alt="A smiling elderly woman with volunteers at an All of Us community event"
            fill
            priority
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}