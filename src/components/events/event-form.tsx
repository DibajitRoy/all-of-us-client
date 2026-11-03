"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authFetch } from "@/lib/api";
import { EVENT_TYPES, type IEvent } from "@/lib/types";
import { nowInputValue, toInputValue } from "@/lib/format";

type Values = {
  title: string; description: string; eventType: string;
  thumbnail: string; location: string; eventDate: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const isUrl = (v: string) => {
  try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; }
  catch { return false; }
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.title.trim().length < 5 || v.title.trim().length > 100) e.title = "Title must be 5 to 100 characters.";
  if (v.description.trim().length < 20 || v.description.trim().length > 2000) e.description = "Description must be 20 to 2000 characters.";
  if (!EVENT_TYPES.includes(v.eventType as (typeof EVENT_TYPES)[number])) e.eventType = "Please select an event type.";
  if (!isUrl(v.thumbnail.trim())) e.thumbnail = "Enter a valid image URL (https://...).";
  if (v.location.trim().length < 3) e.location = "Location must be at least 3 characters.";
  const d = new Date(v.eventDate);
  if (!v.eventDate || Number.isNaN(d.getTime())) e.eventDate = "Please pick an event date.";
  else if (d.getTime() <= Date.now()) e.eventDate = "Event date must be in the future.";
  return e;
}

export function EventForm({ mode, initial }: { mode: "create" | "edit"; initial?: IEvent }) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    eventType: initial?.eventType ?? "",
    thumbnail: initial?.thumbnail ?? "",
    location: initial?.location ?? "",
    eventDate: initial ? toInputValue(initial.eventDate) : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Values, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0] as string);
      return;
    }
    setLoading(true);
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      eventType: values.eventType,
      thumbnail: values.thumbnail.trim(),
      location: values.location.trim(),
      eventDate: new Date(values.eventDate).toISOString(),
    };
    const { ok, data } = await authFetch(
      mode === "create" ? "/add-event" : `/event/${initial?._id}`,
      { method: mode === "create" ? "POST" : "PATCH", body: JSON.stringify(payload) },
    );
    setLoading(false);
    if (!ok) {
      toast.error(data.msg ?? "Something went wrong. Please try again.");
      return;
    }
    toast.success(mode === "create" ? "Event created successfully!" : "Event updated successfully!");
    router.push(mode === "create" ? "/events" : "/manage-events");
    router.refresh();
  };

  const err = (k: keyof Values) =>
    errors[k] ? <p className="text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="grid gap-2">
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" placeholder="Winter Clothes Distribution" value={values.title} onChange={(e) => set("title", e.target.value)} aria-invalid={!!errors.title} />
        {err("title")}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" className="min-h-32" placeholder="Tell volunteers what the event is about, what to bring and where to meet." value={values.description} onChange={(e) => set("description", e.target.value)} aria-invalid={!!errors.description} />
        {err("description")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Event Type</Label>
          <Select value={values.eventType} onValueChange={(v) => set("eventType", v ?? "")}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select event type" /></SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          {err("eventType")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="eventDate">Event Date &amp; Time</Label>
          <Input id="eventDate" type="datetime-local" min={nowInputValue()} value={values.eventDate} onChange={(e) => set("eventDate", e.target.value)} aria-invalid={!!errors.eventDate} />
          {err("eventDate")}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
        <Input id="thumbnail" type="url" placeholder="https://example.com/photo.jpg" value={values.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} aria-invalid={!!errors.thumbnail} />
        {err("thumbnail")}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Mirpur 10, Dhaka" value={values.location} onChange={(e) => set("location", e.target.value)} aria-invalid={!!errors.location} />
        {err("location")}
      </div>

      <Button type="submit" disabled={loading} className="h-10">
        {loading ? <Loader2 className="animate-spin" /> : <Send />}
        {mode === "create" ? "Publish Event" : "Update Event"}
      </Button>
    </form>
  );
}