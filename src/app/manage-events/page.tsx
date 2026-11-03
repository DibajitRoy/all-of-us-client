"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarDays, Loader2, MapPin, Pencil, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SectionHeading } from "@/components/section-heading";
import { authFetch } from "@/lib/api";
import { formatDate, isPast } from "@/lib/format";
import type { IEvent } from "@/lib/types";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [toDelete, setToDelete] = useState<IEvent | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    authFetch<IEvent[]>("/my-events").then(({ ok, data }) => {
      if (!active) return;
      if (ok) setEvents(data);
      else {
        toast.error("Could not load your events.");
        setEvents([]);
      }
    });
    return () => { active = false; };
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    const { ok, data } = await authFetch(`/event/${toDelete._id}`, { method: "DELETE" });
    setDeleting(false);
    if (!ok) {
      toast.error(data.msg ?? "Could not delete the event.");
      return;
    }
    setEvents((list) => (list ?? []).filter((e) => e._id !== toDelete._id));
    toast.success("Event deleted successfully.");
    setToDelete(null);
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="Manage Your Events" subtitle="Update or delete the events you created." />

      <div className="mt-8 space-y-4">
        {events === null &&
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}

        {events?.length === 0 && (
          <div className="rounded-xl border border-dashed py-14 text-center">
            <p className="text-muted-foreground">You have not created any events yet.</p>
            <Link href="/create-event" className={buttonVariants({ className: "mt-4 h-10 px-5" })}>Create your first event</Link>
          </div>
        )}

        {events?.map((e) => {
          const past = isPast(e.eventDate);
          return (
            <div key={e._id} className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-36">
                <Image src={e.thumbnail} alt={e.title} fill unoptimized className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-lg font-semibold">{e.title}</h3>
                  <Badge variant={past ? "secondary" : "default"}>{past ? "Past" : "Upcoming"}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(e.eventDate)}</span>
                  <span className="flex items-center gap-1"><MapPin className="size-4" />{e.location}</span>
                  <span className="flex items-center gap-1"><Users className="size-4" />{e.participants} joined</span>
                </div>
              </div>
              <div className="flex gap-2">
                {past ? (
                  <Button disabled className="h-9"><Pencil /> Update</Button>
                ) : (
                  <Link href={`/manage-events/${e._id}/edit`} className={buttonVariants({ className: "h-9" })}>
                    <Pencil /> Update
                  </Link>
                )}
                <Button variant="destructive" className="h-9" onClick={() => setToDelete(e)}>
                  <Trash2 /> Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && !deleting && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{toDelete?.title}&quot; and everyone&apos;s registrations for it will be removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={deleting} onClick={confirmDelete}>
              {deleting && <Loader2 className="animate-spin" />} Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}