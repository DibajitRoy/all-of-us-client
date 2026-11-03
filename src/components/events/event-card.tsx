import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import type { IEvent } from "@/lib/types";

export function EventCard({ event }: { event: IEvent }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          unoptimized
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3">{event.eventType}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-foreground">{event.title}</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><MapPin className="size-4 shrink-0 text-primary" /><span className="line-clamp-1">{event.location}</span></li>
          <li className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0 text-primary" />{formatDate(event.eventDate)}</li>
          <li className="flex items-center gap-2"><Users className="size-4 shrink-0 text-primary" />{event.participants} joined</li>
        </ul>
        <Link href={`/events/${event._id}`} className={buttonVariants({ className: "mt-5 h-10 w-full" })}>
          View Event
        </Link>
      </div>
    </article>
  );
}