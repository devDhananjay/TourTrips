"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  ImageIcon,
  MessageSquareQuote,
  Newspaper,
  Plus,
  Share2,
  Sparkles,
  Trash2,
  Upload,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import type {
  HomeContent,
  HomeExperience,
  HomeStory,
  SiteCompany,
  SiteSettingsData,
} from "@/lib/site-settings";

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
          {required ? <span className="text-brand"> *</span> : null}
        </span>
        {hint ? <span className="text-[11px] font-medium text-slate-400">{hint}</span> : null}
      </span>
      {textarea ? (
        <textarea
          className="admin-field min-h-[96px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="admin-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | null) {
    if (!files?.[0]) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", files[0]);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2.5">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-3">
        {value ? (
          <div className="relative h-16 w-24 overflow-hidden rounded-lg ring-1 ring-slate-200">
            <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          </div>
        ) : (
          <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-white text-slate-300 ring-1 ring-slate-200">
            <ImageIcon className="h-5 w-5" />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="border-slate-200 bg-white"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload from computer"}
          </Button>
          <p className="text-[11px] text-slate-400">JPG / PNG / WEBP / GIF · max 5MB</p>
        </div>
      </div>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function Section({
  id,
  title,
  description,
  icon: Icon,
  children,
  actions,
  grid = true,
}: {
  id?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  actions?: React.ReactNode;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.18)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-brand-soft/40 px-5 py-4">
        <div className="flex min-w-0 items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/25">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
          <div className="min-w-0">
            <h2 className="text-base font-bold tracking-tight text-slate-900">{title}</h2>
            {description ? (
              <p className="mt-0.5 text-sm text-slate-500">{description}</p>
            ) : null}
          </div>
        </div>
        {actions}
      </div>
      <div className={cn("p-5", grid ? "grid gap-4 md:grid-cols-2" : "space-y-4")}>
        {children}
      </div>
    </section>
  );
}

const JUMP_LINKS = [
  { id: "brand", label: "Brand" },
  { id: "logos", label: "Logos" },
  { id: "social", label: "Social" },
  { id: "hero", label: "Hero" },
  { id: "sections", label: "Sections" },
  { id: "stories", label: "Stories" },
  { id: "reviews", label: "Reviews" },
] as const;

export default function SiteSettingsEditor({
  initial,
}: {
  initial: SiteSettingsData;
}) {
  const router = useRouter();
  const [company, setCompany] = useState<SiteCompany>(initial.company);
  const [home, setHome] = useState<HomeContent>(initial.home);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  function notify(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2800);
  }

  function setCompanyField<K extends keyof SiteCompany>(key: K, value: SiteCompany[K]) {
    setCompany((prev) => ({ ...prev, [key]: value }));
  }

  function setSocial(key: keyof SiteCompany["social"], value: string) {
    setCompany((prev) => ({
      ...prev,
      social: { ...prev.social, [key]: value },
    }));
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, home }),
    });
    setSaving(false);
    if (!res.ok) {
      notify("Save failed. Check fields and try again.");
      return;
    }
    notify("Site & home content updated.");
    router.refresh();
  }

  function updateExperience(index: number, patch: Partial<HomeExperience>) {
    setHome((prev) => {
      const items = [...prev.thingsToDo.items];
      items[index] = { ...items[index], ...patch };
      return { ...prev, thingsToDo: { ...prev.thingsToDo, items } };
    });
  }

  function updateStory(index: number, patch: Partial<HomeStory>) {
    setHome((prev) => {
      const stories = [...prev.getInspired.stories];
      stories[index] = { ...stories[index], ...patch };
      return { ...prev, getInspired: { ...prev.getInspired, stories } };
    });
  }

  return (
    <form onSubmit={onSave} className="relative space-y-5 pb-24">
      {toast ? (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {toast}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#0f274d] text-white shadow-[0_18px_40px_-24px_rgba(15,39,77,0.65)]">
        <div className="relative px-5 py-5 md:px-6 md:py-6">
          <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-sky-400/15 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-28 w-28 rounded-full bg-amber-300/10 blur-2xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-100">
                <Sparkles className="h-3.5 w-3.5" />
                Homepage CMS
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-[1.7rem]">
                Shape what travellers see first
              </h2>
              <p className="mt-1.5 text-sm text-slate-300">
                Contact, social, copy and images — edits go live on the website
                after you save.
              </p>
            </div>
            <Button
              type="submit"
              disabled={saving}
              className="bg-white text-brand hover:bg-sky-50"
            >
              {saving ? "Saving..." : "Save all changes"}
            </Button>
          </div>
          <div className="relative mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {JUMP_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Section
        id="brand"
        title="Brand & contact"
        description="Phone, email, WhatsApp and office details shown across the site."
        icon={Building2}
      >
        <Field
          label="Brand name"
          value={company.name}
          onChange={(v) => setCompanyField("name", v)}
          required
        />
        <Field
          label="Tagline"
          value={company.tagline}
          onChange={(v) => setCompanyField("tagline", v)}
          required
        />
        <div className="md:col-span-2">
          <Field
            label="Company description"
            value={company.description}
            onChange={(v) => setCompanyField("description", v)}
            textarea
            required
          />
        </div>
        <Field
          label="Phone (display)"
          value={company.phone}
          onChange={(v) => setCompanyField("phone", v)}
          required
          hint="Shown in header"
        />
        <Field
          label="Phone (tel link digits)"
          value={company.phoneRaw}
          onChange={(v) => setCompanyField("phoneRaw", v)}
          required
          hint="Digits only"
        />
        <Field
          label="Email"
          value={company.email}
          onChange={(v) => setCompanyField("email", v)}
          type="email"
          required
        />
        <Field
          label="WhatsApp number"
          value={company.whatsapp}
          onChange={(v) => setCompanyField("whatsapp", v)}
          required
          hint="Country code, no +"
        />
        <div className="md:col-span-2">
          <Field
            label="Address"
            value={company.address}
            onChange={(v) => setCompanyField("address", v)}
            textarea
            required
          />
        </div>
        <Field
          label="Working hours"
          value={company.workingHours}
          onChange={(v) => setCompanyField("workingHours", v)}
          required
        />
      </Section>

      <Section
        id="logos"
        title="Logos & brand images"
        description="Upload from your computer or paste an image URL."
        icon={ImageIcon}
      >
        <ImageField
          label="Logo URL"
          value={company.logo}
          onChange={(v) => setCompanyField("logo", v)}
        />
        <ImageField
          label="Logo mark / square"
          value={company.logoMark}
          onChange={(v) => setCompanyField("logoMark", v)}
        />
        <ImageField
          label="Favicon"
          value={company.favicon}
          onChange={(v) => setCompanyField("favicon", v)}
        />
      </Section>

      <Section
        id="social"
        title="Social media"
        description="Footer and share destination links."
        icon={Share2}
      >
        <Field
          label="Facebook URL"
          value={company.social.facebook}
          onChange={(v) => setSocial("facebook", v)}
        />
        <Field
          label="Instagram URL"
          value={company.social.instagram}
          onChange={(v) => setSocial("instagram", v)}
        />
        <Field
          label="Twitter / X URL"
          value={company.social.twitter}
          onChange={(v) => setSocial("twitter", v)}
        />
        <Field
          label="YouTube URL"
          value={company.social.youtube}
          onChange={(v) => setSocial("youtube", v)}
        />
      </Section>

      <Section
        id="hero"
        title="Home hero"
        description="Full-bleed image behind the search panel."
        icon={ImageIcon}
      >
        <ImageField
          label="Hero background image"
          value={home.hero.image}
          onChange={(v) =>
            setHome((prev) => ({ ...prev, hero: { ...prev.hero, image: v } }))
          }
        />
        <Field
          label="Hero image alt text"
          value={home.hero.alt}
          onChange={(v) =>
            setHome((prev) => ({ ...prev, hero: { ...prev.hero, alt: v } }))
          }
        />
      </Section>

      <Section
        id="sections"
        title="Destination section copy"
        description="Headlines for International and India blocks."
        icon={Newspaper}
      >
        <Field
          label="International eyebrow"
          value={home.international.eyebrow}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              international: { ...p.international, eyebrow: v },
            }))
          }
        />
        <Field
          label="International title"
          value={home.international.title}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              international: { ...p.international, title: v },
            }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="International description"
            value={home.international.description}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                international: { ...p.international, description: v },
              }))
            }
            textarea
          />
        </div>
        <Field
          label="India eyebrow"
          value={home.india.eyebrow}
          onChange={(v) =>
            setHome((p) => ({ ...p, india: { ...p.india, eyebrow: v } }))
          }
        />
        <Field
          label="India title"
          value={home.india.title}
          onChange={(v) =>
            setHome((p) => ({ ...p, india: { ...p.india, title: v } }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="India description"
            value={home.india.description}
            onChange={(v) =>
              setHome((p) => ({ ...p, india: { ...p.india, description: v } }))
            }
            textarea
          />
        </div>
      </Section>

      <Section
        id="stories"
        title="Things to do cards"
        description="Experience tiles with image, tag and link."
        icon={Sparkles}
        grid={false}
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-slate-200 bg-white"
            onClick={() =>
              setHome((p) => ({
                ...p,
                thingsToDo: {
                  ...p.thingsToDo,
                  items: [
                    ...p.thingsToDo.items,
                    {
                      id: `exp-${Date.now()}`,
                      tag: "New",
                      title: "New experience",
                      href: "/packages",
                      image:
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
                    },
                  ],
                },
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add card
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Section eyebrow"
            value={home.thingsToDo.eyebrow}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                thingsToDo: { ...p.thingsToDo, eyebrow: v },
              }))
            }
          />
          <Field
            label="Section title"
            value={home.thingsToDo.title}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                thingsToDo: { ...p.thingsToDo, title: v },
              }))
            }
          />
        </div>
        <div className="space-y-3">
          {home.thingsToDo.items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:grid-cols-2"
            >
              <Field
                label="Tag"
                value={item.tag}
                onChange={(v) => updateExperience(index, { tag: v })}
              />
              <Field
                label="Title"
                value={item.title}
                onChange={(v) => updateExperience(index, { title: v })}
              />
              <Field
                label="Link href"
                value={item.href}
                onChange={(v) => updateExperience(index, { href: v })}
              />
              <ImageField
                label="Image"
                value={item.image}
                onChange={(v) => updateExperience(index, { image: v })}
              />
              <div className="md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:border-red-300 hover:text-red-700"
                  onClick={() =>
                    setHome((p) => ({
                      ...p,
                      thingsToDo: {
                        ...p.thingsToDo,
                        items: p.thingsToDo.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove card
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Get inspired stories"
        description="Featured inspiration grid on the homepage."
        icon={MessageSquareQuote}
        grid={false}
        actions={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-slate-200 bg-white"
            onClick={() =>
              setHome((p) => ({
                ...p,
                getInspired: {
                  ...p.getInspired,
                  stories: [
                    ...p.getInspired.stories,
                    {
                      id: `story-${Date.now()}`,
                      tag: "Story",
                      title: "New inspiration story",
                      href: "/destinations",
                      image:
                        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
                    },
                  ],
                },
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add story
          </Button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Section eyebrow"
            value={home.getInspired.eyebrow}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                getInspired: { ...p.getInspired, eyebrow: v },
              }))
            }
          />
          <Field
            label="Section title"
            value={home.getInspired.title}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                getInspired: { ...p.getInspired, title: v },
              }))
            }
          />
        </div>
        <div className="space-y-3">
          {home.getInspired.stories.map((story, index) => (
            <div
              key={story.id}
              className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:grid-cols-2"
            >
              <Field
                label="Tag"
                value={story.tag}
                onChange={(v) => updateStory(index, { tag: v })}
              />
              <Field
                label="Title"
                value={story.title}
                onChange={(v) => updateStory(index, { title: v })}
              />
              <Field
                label="Link href"
                value={story.href}
                onChange={(v) => updateStory(index, { href: v })}
              />
              <label className="flex items-center gap-2 self-end rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[var(--brand)]"
                  checked={Boolean(story.featured)}
                  onChange={(e) =>
                    updateStory(index, { featured: e.target.checked })
                  }
                />
                Featured large card
              </label>
              <div className="md:col-span-2">
                <ImageField
                  label="Image"
                  value={story.image}
                  onChange={(v) => updateStory(index, { image: v })}
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:border-red-300 hover:text-red-700"
                  onClick={() =>
                    setHome((p) => ({
                      ...p,
                      getInspired: {
                        ...p.getInspired,
                        stories: p.getInspired.stories.filter(
                          (_, i) => i !== index,
                        ),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove story
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Enquiry / quote section"
        description="Copy next to the free quote form."
        icon={Newspaper}
      >
        <Field
          label="Eyebrow"
          value={home.enquiry.eyebrow}
          onChange={(v) =>
            setHome((p) => ({ ...p, enquiry: { ...p.enquiry, eyebrow: v } }))
          }
        />
        <Field
          label="Title"
          value={home.enquiry.title}
          onChange={(v) =>
            setHome((p) => ({ ...p, enquiry: { ...p.enquiry, title: v } }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="Body"
            value={home.enquiry.body}
            onChange={(v) =>
              setHome((p) => ({ ...p, enquiry: { ...p.enquiry, body: v } }))
            }
            textarea
          />
        </div>
        <div className="md:col-span-2">
          <Field
            label="Bullets (one per line)"
            value={home.enquiry.bullets.join("\n")}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                enquiry: {
                  ...p.enquiry,
                  bullets: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
              }))
            }
            textarea
          />
        </div>
      </Section>

      <Section
        title="Customize trip CTA"
        description="DIY holiday banner above Why Choose Us."
        icon={Sparkles}
      >
        <Field
          label="Eyebrow"
          value={home.customizeCta.eyebrow}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              customizeCta: { ...p.customizeCta, eyebrow: v },
            }))
          }
        />
        <Field
          label="Title"
          value={home.customizeCta.title}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              customizeCta: { ...p.customizeCta, title: v },
            }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="Body"
            value={home.customizeCta.body}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                customizeCta: { ...p.customizeCta, body: v },
              }))
            }
            textarea
          />
        </div>
      </Section>

      <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Why choose us</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setHome((p) => ({
                ...p,
                whyChooseUs: {
                  ...p.whyChooseUs,
                  items: [
                    ...p.whyChooseUs.items,
                    {
                      title: "New highlight",
                      description: "Describe this benefit.",
                      icon: "Sparkles",
                    },
                  ],
                },
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add item
          </Button>
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={home.whyChooseUs.eyebrow}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                whyChooseUs: { ...p.whyChooseUs, eyebrow: v },
              }))
            }
          />
          <Field
            label="Title"
            value={home.whyChooseUs.title}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                whyChooseUs: { ...p.whyChooseUs, title: v },
              }))
            }
          />
          <div className="md:col-span-2">
            <Field
              label="Description"
              value={home.whyChooseUs.description}
              onChange={(v) =>
                setHome((p) => ({
                  ...p,
                  whyChooseUs: { ...p.whyChooseUs, description: v },
                }))
              }
              textarea
            />
          </div>
        </div>
        <div className="space-y-3">
          {home.whyChooseUs.items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-3"
            >
              <Field
                label="Title"
                value={item.title}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.whyChooseUs.items];
                    items[index] = { ...items[index], title: v };
                    return {
                      ...p,
                      whyChooseUs: { ...p.whyChooseUs, items },
                    };
                  })
                }
              />
              <Field
                label="Icon name"
                value={item.icon}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.whyChooseUs.items];
                    items[index] = { ...items[index], icon: v };
                    return {
                      ...p,
                      whyChooseUs: { ...p.whyChooseUs, items },
                    };
                  })
                }
              />
              <div className="md:col-span-3">
                <Field
                  label="Description"
                  value={item.description}
                  onChange={(v) =>
                    setHome((p) => {
                      const items = [...p.whyChooseUs.items];
                      items[index] = { ...items[index], description: v };
                      return {
                        ...p,
                        whyChooseUs: { ...p.whyChooseUs, items },
                      };
                    })
                  }
                  textarea
                />
              </div>
              <div className="md:col-span-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setHome((p) => ({
                      ...p,
                      whyChooseUs: {
                        ...p.whyChooseUs,
                        items: p.whyChooseUs.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.18)]">
        <h2 className="mb-4 text-lg font-bold">Trust stats</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {home.trustStats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="grid gap-2 rounded-xl border border-border bg-surface p-3"
            >
              <Field
                label="Value"
                value={stat.value}
                onChange={(v) =>
                  setHome((p) => {
                    const trustStats = [...p.trustStats];
                    trustStats[index] = { ...trustStats[index], value: v };
                    return { ...p, trustStats };
                  })
                }
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(v) =>
                  setHome((p) => {
                    const trustStats = [...p.trustStats];
                    trustStats[index] = { ...trustStats[index], label: v };
                    return { ...p, trustStats };
                  })
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Home services cards</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setHome((p) => ({
                ...p,
                services: {
                  ...p.services,
                  items: [
                    ...p.services.items,
                    {
                      id: `svc-${Date.now()}`,
                      title: "New service",
                      description: "Describe this service.",
                      icon: "Map",
                    },
                  ],
                },
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add service
          </Button>
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={home.services.eyebrow}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                services: { ...p.services, eyebrow: v },
              }))
            }
          />
          <Field
            label="Title"
            value={home.services.title}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                services: { ...p.services, title: v },
              }))
            }
          />
          <div className="md:col-span-2">
            <Field
              label="Description"
              value={home.services.description}
              onChange={(v) =>
                setHome((p) => ({
                  ...p,
                  services: { ...p.services, description: v },
                }))
              }
              textarea
            />
          </div>
        </div>
        <div className="space-y-3">
          {home.services.items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-2"
            >
              <Field
                label="Title"
                value={item.title}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.services.items];
                    items[index] = { ...items[index], title: v };
                    return { ...p, services: { ...p.services, items } };
                  })
                }
              />
              <Field
                label="Icon name"
                value={item.icon}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.services.items];
                    items[index] = { ...items[index], icon: v };
                    return { ...p, services: { ...p.services, items } };
                  })
                }
              />
              <div className="md:col-span-2">
                <Field
                  label="Description"
                  value={item.description}
                  onChange={(v) =>
                    setHome((p) => {
                      const items = [...p.services.items];
                      items[index] = { ...items[index], description: v };
                      return { ...p, services: { ...p.services, items } };
                    })
                  }
                  textarea
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setHome((p) => ({
                      ...p,
                      services: {
                        ...p.services,
                        items: p.services.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section title="Testimonials section copy">
        <Field
          label="Eyebrow"
          value={home.testimonials.eyebrow}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              testimonials: { ...p.testimonials, eyebrow: v },
            }))
          }
        />
        <Field
          label="Title"
          value={home.testimonials.title}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              testimonials: { ...p.testimonials, title: v },
            }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="Description"
            value={home.testimonials.description}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                testimonials: { ...p.testimonials, description: v },
              }))
            }
            textarea
          />
        </div>
      </Section>

      <section className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.18)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Testimonials</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setHome((p) => ({
                ...p,
                testimonials: {
                  ...p.testimonials,
                  items: [
                    ...p.testimonials.items,
                    {
                      id: `t-${Date.now()}`,
                      name: "Traveller",
                      location: "India",
                      rating: 5,
                      trip: "Holiday package",
                      review: "Great experience with Yogo Voyage.",
                      image:
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
                    },
                  ],
                },
              }))
            }
          >
            <Plus className="h-4 w-4" /> Add testimonial
          </Button>
        </div>
        <div className="space-y-4">
          {home.testimonials.items.map((t, index) => (
            <div
              key={t.id}
              className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-2"
            >
              <Field
                label="Name"
                value={t.name}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.testimonials.items];
                    items[index] = { ...items[index], name: v };
                    return {
                      ...p,
                      testimonials: { ...p.testimonials, items },
                    };
                  })
                }
              />
              <Field
                label="Location"
                value={t.location}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.testimonials.items];
                    items[index] = { ...items[index], location: v };
                    return {
                      ...p,
                      testimonials: { ...p.testimonials, items },
                    };
                  })
                }
              />
              <Field
                label="Trip"
                value={t.trip}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.testimonials.items];
                    items[index] = { ...items[index], trip: v };
                    return {
                      ...p,
                      testimonials: { ...p.testimonials, items },
                    };
                  })
                }
              />
              <Field
                label="Rating (1-5)"
                value={String(t.rating)}
                onChange={(v) =>
                  setHome((p) => {
                    const items = [...p.testimonials.items];
                    items[index] = {
                      ...items[index],
                      rating: Math.min(5, Math.max(1, Number(v) || 5)),
                    };
                    return {
                      ...p,
                      testimonials: { ...p.testimonials, items },
                    };
                  })
                }
              />
              <div className="md:col-span-2">
                <Field
                  label="Review"
                  value={t.review}
                  onChange={(v) =>
                    setHome((p) => {
                      const items = [...p.testimonials.items];
                      items[index] = { ...items[index], review: v };
                      return {
                        ...p,
                        testimonials: { ...p.testimonials, items },
                      };
                    })
                  }
                  textarea
                />
              </div>
              <div className="md:col-span-2">
                <ImageField
                  label="Photo"
                  value={t.image}
                  onChange={(v) =>
                    setHome((p) => {
                      const items = [...p.testimonials.items];
                      items[index] = { ...items[index], image: v };
                      return {
                        ...p,
                        testimonials: { ...p.testimonials, items },
                      };
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setHome((p) => ({
                      ...p,
                      testimonials: {
                        ...p.testimonials,
                        items: p.testimonials.items.filter((_, i) => i !== index),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section
        title="Bottom CTA"
        description="Final conversion band near the footer."
        icon={Sparkles}
      >
        <ImageField
          label="Background image"
          value={home.bottomCta.image}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              bottomCta: { ...p.bottomCta, image: v },
            }))
          }
        />
        <Field
          label="Title"
          value={home.bottomCta.title}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              bottomCta: { ...p.bottomCta, title: v },
            }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="Body"
            value={home.bottomCta.body}
            onChange={(v) =>
              setHome((p) => ({
                ...p,
                bottomCta: { ...p.bottomCta, body: v },
              }))
            }
            textarea
          />
        </div>
      </Section>

      <Section
        id="reviews"
        title="Newsletter"
        description="Subscribe strip at the bottom of the homepage."
        icon={Newspaper}
      >
        <Field
          label="Title"
          value={home.newsletter.title}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              newsletter: { ...p.newsletter, title: v },
            }))
          }
        />
        <Field
          label="Body"
          value={home.newsletter.body}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              newsletter: { ...p.newsletter, body: v },
            }))
          }
          textarea
        />
      </Section>

      <div className="pointer-events-none sticky bottom-4 z-20 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-2.5 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur-md">
          <p className="hidden px-2 text-xs font-medium text-slate-500 sm:block">
            Changes apply live after save
          </p>
          <Button type="submit" size="md" disabled={saving}>
            {saving ? "Saving..." : "Save all changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
