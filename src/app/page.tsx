import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { RecentEvents } from "@/components/home/recent-events";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </main>
  );
}