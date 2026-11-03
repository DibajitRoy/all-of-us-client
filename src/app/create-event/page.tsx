import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { EventForm } from "@/components/events/event-form";

export const metadata: Metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading as="h1" title="Create Event" subtitle="Share the details and bring people together." />
      <div className="mt-8"><EventForm mode="create" /></div>
    </main>
  );
}