"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, navLinks } from "@/data/company";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";

function SocialIcon({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="rounded-lg border border-slate-700 p-2 hover:border-accent hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border bg-[#0b1f3f] text-slate-300">
      <div className="container-page section-pad grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 inline-flex items-center">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={140}
              height={76}
              className="h-16 w-auto object-contain brightness-110"
            />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {company.description}
          </p>
          <div className="mt-5 flex gap-3">
            <SocialIcon
              href={company.social.facebook}
              label="Facebook"
              path="M14 13.5h2.5l.5-3H14v-1.5c0-.8.2-1.3 1.4-1.3H17V5.1C16.5 5 15.6 5 14.7 5 12.5 5 11 6.3 11 8.6V10.5H8.5v3H11V20h3v-6.5z"
            />
            <SocialIcon
              href={company.social.instagram}
              label="Instagram"
              path="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zM17.7 6.8a1.05 1.05 0 1 0 1.05 1.05A1.05 1.05 0 0 0 17.7 6.8z"
            />
            <SocialIcon
              href={company.social.twitter}
              label="Twitter"
              path="M3 5.5 10.2 12 3 18.5h2.4L12 13.3l5.2 5.2H21L13.6 12 20.6 5.5H18.2L12 10.7 6.6 5.5z"
            />
            <SocialIcon
              href={company.social.youtube}
              label="YouTube"
              path="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28.2 28.2 0 0 0 2 12a28.2 28.2 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28.2 28.2 0 0 0 22 12a28.2 28.2 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12z"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg text-white">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg text-white">Popular Destinations</h3>
          <ul className="space-y-2.5 text-sm">
            {destinations.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/destinations#${d.slug}`}
                  className="hover:text-accent"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-8 text-lg text-white">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link href="/services" className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg text-white">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${company.phoneRaw}`} className="hover:text-accent">
                {company.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${company.email}`} className="hover:text-accent">
                {company.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{company.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Crafted for memorable journeys across India & beyond.</p>
        </div>
      </div>
    </footer>
  );
}
