"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/section-heading";
import { authFetch } from "@/lib/api";
import { formatDateTime, isPast } from "@/lib/format";
import type { IJoinedEvent } from "@/lib/types";

export default function JoinedEventsPage() {
  const [items, setItems] = useState<IJoinedEvent[] | null>(null);

  useEffect(() => {
    let active = true;
    authFetch<IJoinedEvent[]>("/joined-events").then(({ ok, data }) => {
      if (!active) return;
      if (ok) setItems(data);
      else {
        toast.error("Could not load your joined events.");
        setItems([]);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="My Joined Events" subtitle="Events you have joined, sorted by date." />

      <div className="mt-8 space-y-4">
        {items === null && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}

        {items?.length === 0 && (
          <div className="rounded-xl border border-dashed py-14 text-center">
            <p className="text-muted-foreground">You have not joined any events yet.</p>
            <Link href="/events" className={buttonVariants({ className: "mt-4 h-10 px-5" })}>Browse events</Link>
          </div>
        )}

        {items?.map((j) => (
          <div key={j._id} className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-36">
              <Image src={j.thumbnail} alt={j.title} fill unoptimized className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-lg font-semibold">{j.title}</h3>
                <Badge>{j.eventType}</Badge>
                <Badge variant="secondary">{isPast(j.eventDate) ? "Completed" : "Joined"}</Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDateTime(j.eventDate)}</span>
                <span className="flex items-center gap-1"><MapPin className="size-4" />{j.location}</span>
              </div>
            </div>
            <Link href={`/events/${j.eventId}`} className={buttonVariants({ variant: "outline", className: "h-9" })}>View Event</Link>
          </div>
        ))}
      </div>
    </main>
  );
}