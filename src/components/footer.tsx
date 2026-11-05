import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { FacebookIcon, GithubIcon, LinkedinIcon, XIcon } from "@/components/social-icons";

const socials = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-br from-[#0b3f4d] to-[#0f6b7a] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo onDark taglineClassName="block" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
            A community platform where neighbours organise and join social service events,
            from winter clothes drives to tree plantations. Together, we make a difference.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-[#0b3f4d]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/events">Upcoming Events</Link></li>
            <li><Link className="hover:text-white" href="/create-event">Create Event</Link></li>
            <li><Link className="hover:text-white" href="/joined-events">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Mirpur 10, Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> hello@allofus.com</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> +880 1700 000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/70">
        © {new Date().getFullYear()} All of Us. All rights reserved.
      </div>
    </footer>
  );
}