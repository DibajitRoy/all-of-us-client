import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, UserRound, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JoinButton } from "@/components/events/join-button";
import { getEventById } from "@/lib/api";
import { formatDateTime, isPast } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();
  const ended = isPast(event.eventDate);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to Upcoming Events
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
          <Image src={event.thumbnail} alt={event.title} fill priority unoptimized className="object-cover" />
        </div>

        <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
          <Badge className="w-fit">{event.eventType}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{event.title}</h1>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /> {event.location}</li>
            <li className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /> {formatDateTime(event.eventDate)}</li>
            <li className="flex items-center gap-2"><UserRound className="size-4 text-primary" /> Organised by {event.creatorName ?? event.creatorEmail}</li>
            <li className="flex items-center gap-2"><Users className="size-4 text-primary" /> {event.participants} people joined</li>
          </ul>
          <div className="mt-6"><JoinButton eventId={event._id} ended={ended} /></div>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight">About This Event</h2>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{event.description}</p>
      </section>
    </main>
  );
}