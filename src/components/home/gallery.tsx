import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";

const photos = [
  { src: "/gallery/clothes-donation.jpg", alt: "Volunteers donating clothes", caption: "Clothes donation" },
  { src: "/gallery/tree-planting.jpg", alt: "Volunteers planting trees", caption: "Tree plantation" },
  { src: "/gallery/food-donation.jpg", alt: "Volunteers distributing food", caption: "Food distribution" },
  { src: "/gallery/education.jpg", alt: "Children at an education support programme", caption: "Education support" },
  { src: "/gallery/volunteer-meetup.jpg", alt: "Volunteers at a meetup", caption: "Volunteer meetup" },
  { src: "/gallery/relief-distribution.jpg", alt: "People waiting in line for relief food", caption: "Relief distribution" },
];

export function Gallery() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          center
          title="Moments of Kindness"
          subtitle="A glimpse of what our community has done together."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {photos.map((p) => (
            <figure key={p.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width:1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-medium text-white">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}