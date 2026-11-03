import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EventGrid, EventGridSkeleton } from "@/components/events/event-grid";
import { getFeaturedEvents } from "@/lib/api";

async function Items() {
  return <EventGrid events={await getFeaturedEvents()} />;
}

export function RecentEvents() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Recent Upcoming Events" subtitle="Fresh opportunities to lend a hand this month." />
          <Link href="/events" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <Suspense fallback={<EventGridSkeleton count={6} />}>
          <Items />
        </Suspense>
      </div>
    </section>
  );
}