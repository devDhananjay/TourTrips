"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload } from "lucide-react";
import Button from "@/components/Button";
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-semibold text-foreground">{label}</span>
      {textarea ? (
        <textarea
          className="form-control min-h-[88px]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="form-control"
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
    <div className="space-y-2">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-border bg-surface">
            <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          </div>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload from computer"}
        </Button>
        <span className="text-xs text-muted">JPG / PNG / WEBP / GIF · max 5MB</span>
      </div>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-foreground">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

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
    <form onSubmit={onSave} className="space-y-5">
      {toast ? (
        <div className="rounded-xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
          {toast}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Homepage CMS
          </p>
          <p className="text-sm text-muted">
            Edit contact, social, copy & images. Changes show live on the website.
          </p>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save all changes"}
        </Button>
      </div>

      <Section title="Brand & contact">
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
        />
        <Field
          label="Phone (tel link digits)"
          value={company.phoneRaw}
          onChange={(v) => setCompanyField("phoneRaw", v)}
          required
        />
        <Field
          label="Email"
          value={company.email}
          onChange={(v) => setCompanyField("email", v)}
          type="email"
          required
        />
        <Field
          label="WhatsApp number (country code, no +)"
          value={company.whatsapp}
          onChange={(v) => setCompanyField("whatsapp", v)}
          required
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

      <Section title="Logos & brand images">
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

      <Section title="Social media">
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

      <Section title="Home hero">
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

      <Section title="International destinations section">
        <Field
          label="Eyebrow"
          value={home.international.eyebrow}
          onChange={(v) =>
            setHome((p) => ({
              ...p,
              international: { ...p.international, eyebrow: v },
            }))
          }
        />
        <Field
          label="Title"
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
            label="Description"
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
      </Section>

      <Section title="India destinations section">
        <Field
          label="Eyebrow"
          value={home.india.eyebrow}
          onChange={(v) =>
            setHome((p) => ({ ...p, india: { ...p.india, eyebrow: v } }))
          }
        />
        <Field
          label="Title"
          value={home.india.title}
          onChange={(v) =>
            setHome((p) => ({ ...p, india: { ...p.india, title: v } }))
          }
        />
        <div className="md:col-span-2">
          <Field
            label="Description"
            value={home.india.description}
            onChange={(v) =>
              setHome((p) => ({ ...p, india: { ...p.india, description: v } }))
            }
            textarea
          />
        </div>
      </Section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Things to do cards</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
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
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
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
        <div className="space-y-4">
          {home.thingsToDo.items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-2"
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
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Get inspired stories</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
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
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
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
        <div className="space-y-4">
          {home.getInspired.stories.map((story, index) => (
            <div
              key={story.id}
              className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-2"
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
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
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
      </section>

      <Section title="Enquiry / quote section">
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

      <Section title="Customize trip CTA">
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

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
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

      <Section title="Bottom CTA">
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

      <Section title="Newsletter">
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

      <div className="sticky bottom-4 z-10 flex justify-end">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving..." : "Save all changes"}
        </Button>
      </div>
    </form>
  );
}
