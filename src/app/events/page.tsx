import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { EventGrid, EventGridSkeleton } from "@/components/events/event-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEvents } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/types";

export const metadata: Metadata = { title: "Upcoming Events" };

async function List({ type, search }: { type: string; search: string }) {
  return <EventGrid events={await getEvents(type, search)} />;
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; search?: string }>;
}) {
  const { type = "all", search = "" } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="Upcoming Events" subtitle="Be a part of something meaningful. Pick an event and make a difference." />

      <form action="/events" method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="search" defaultValue={search} placeholder="Search by title or location" className="h-10 pl-9" aria-label="Search events" />
        </div>
        <select
          name="type"
          defaultValue={type}
          aria-label="Event type"
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="all">All Types</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <Button type="submit" className="h-10 px-6">Search</Button>
      </form>

      <div className="mt-10">
        <Suspense key={`${type}-${search}`} fallback={<EventGridSkeleton count={6} />}>
          <List type={type} search={search} />
        </Suspense>
      </div>
    </main>
  );
}