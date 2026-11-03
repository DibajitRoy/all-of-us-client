import { CalendarPlus, HeartHandshake, ListChecks, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const features = [
  { icon: CalendarPlus, title: "Create Events", text: "Organise a cleanup, plantation or donation drive in a few minutes." },
  { icon: MapPin, title: "Find Local Events", text: "Browse upcoming events by area and category, right in your neighbourhood." },
  { icon: HeartHandshake, title: "Join in One Click", text: "Reserve your spot instantly and keep every event you joined in one place." },
  { icon: ListChecks, title: "Manage Easily", text: "Update details or remove your events whenever plans change." },
];

export function Features() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading center title="Why Choose All of Us" subtitle="Everything you need to bring people together for a good cause." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="h-full rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}