import Link from "next/link";
import { CalendarX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { EventCard } from "./event-card";
import type { IEvent } from "@/lib/types";

export function EventGrid({ events }: { events: IEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
        <CalendarX className="size-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No upcoming events found</h3>
        <p className="mt-1 text-sm text-muted-foreground">Try a different filter, or be the first to organise one.</p>
        <Link href="/create-event" className={buttonVariants({ className: "mt-5 h-10 px-5" })}>Create an Event</Link>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => <EventCard key={e._id} event={e} />)}
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border bg-card">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}