"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { EventForm } from "@/components/events/event-form";
import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import { isPast } from "@/lib/format";
import type { IEvent } from "@/lib/types";

function Notice({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed py-14 text-center">
      <p className="text-muted-foreground">{text}</p>
      <Link href="/manage-events" className={buttonVariants({ className: "mt-4 h-10 px-5" })}>Back to Manage Events</Link>
    </div>
  );
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = authClient.useSession();
  const [event, setEvent] = useState<IEvent | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/event/${id}`, { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<IEvent>) : null))
      .then((d) => active && setEvent(d))
      .catch(() => active && setEvent(null));
    return () => { active = false; };
  }, [id]);

  let body: React.ReactNode;
  if (event === undefined || isPending) body = <Skeleton className="h-[480px] w-full rounded-2xl" />;
  else if (!event) body = <Notice text="This event could not be found." />;
  else if (event.creatorEmail !== session?.user.email) body = <Notice text="You can only update events that you created." />;
  else if (isPast(event.eventDate)) body = <Notice text="Past events can no longer be updated." />;
  else body = <EventForm mode="edit" initial={event} />;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="Update Event" subtitle="Keep the details accurate for your volunteers." />
      <div className="mt-8">{body}</div>
    </main>
  );
}