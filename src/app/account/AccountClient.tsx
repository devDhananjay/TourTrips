"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

type Fav = {
  id: string;
  packageId: string;
  name: string;
  slug: string;
  destination: string;
  price: string;
  image: string;
};

type Plan = {
  id: string;
  title: string;
  destination: string;
  travelDate: string | null;
  travellers: number;
  budget: string | null;
  notes: string | null;
};

type Trip = {
  id: string;
  title: string;
  destination: string;
  travelDate: string | null;
  status: string;
  notes: string | null;
};

type AccountTab = "profile" | "favorites" | "plans" | "trips";

export default function AccountClient({
  user,
  favorites,
  plans,
  trips,
  initialTab = "profile",
}: {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  favorites: Fav[];
  plans: Plan[];
  trips: Trip[];
  initialTab?: AccountTab;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<AccountTab>(initialTab);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [message, setMessage] = useState("");
  const [planForm, setPlanForm] = useState({
    title: "",
    destination: "",
    travelDate: "",
    travellers: "2",
    budget: "",
    notes: "",
  });
  const [tripForm, setTripForm] = useState({
    title: "",
    destination: "",
    travelDate: "",
    notes: "",
  });

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    setMessage(res.ok ? "Profile updated." : "Could not update profile.");
    router.refresh();
  }

  async function removeFavorite(packageId: string, packageSlug: string) {
    await fetch(
      `/api/account/favorites?packageId=${packageId}&packageSlug=${packageSlug}`,
      { method: "DELETE" },
    );
    router.refresh();
  }

  async function addPlan(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/account/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...planForm,
        travellers: Number(planForm.travellers) || 2,
      }),
    });
    setPlanForm({
      title: "",
      destination: "",
      travelDate: "",
      travellers: "2",
      budget: "",
      notes: "",
    });
    router.refresh();
  }

  async function deletePlan(id: string) {
    await fetch(`/api/account/plans?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function addTrip(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/account/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripForm),
    });
    setTripForm({ title: "", destination: "", travelDate: "", notes: "" });
    router.refresh();
  }

  async function deleteTrip(id: string) {
    await fetch(`/api/account/trips?id=${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const tabs = [
    { id: "profile" as const, label: "Profile" },
    { id: "favorites" as const, label: "Favourites" },
    { id: "plans" as const, label: "Saved plans" },
    { id: "trips" as const, label: "Past trips" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-white p-5 md:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-brand text-white"
                : "border border-border text-stone-700 hover:border-brand hover:text-brand"
            }`}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={logout}
          className="ml-auto rounded-full border border-border px-4 py-2 text-sm font-medium text-stone-700 hover:border-red-300 hover:text-red-600"
        >
          Log out
        </button>
      </div>

      {tab === "profile" ? (
        <form onSubmit={saveProfile} className="max-w-lg space-y-3">
          <label className="form-field">
            <span>Name</span>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input className="form-control" value={user.email} disabled />
          </label>
          <label className="form-field">
            <span>Phone</span>
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          {message ? <p className="text-sm text-green-700">{message}</p> : null}
          <Button type="submit">Save profile</Button>
        </form>
      ) : null}

      {tab === "favorites" ? (
        <div className="space-y-3">
          {favorites.length === 0 ? (
            <p className="text-muted">
              No favourites yet. Browse{" "}
              <Link href="/packages" className="text-brand underline">
                packages
              </Link>{" "}
              and save what you love.
            </p>
          ) : (
            favorites.map((f) => (
              <div
                key={f.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4"
              >
                <div>
                  <Link
                    href={`/packages/${f.slug}`}
                    className="font-semibold text-foreground hover:text-brand"
                  >
                    {f.name}
                  </Link>
                  <p className="text-sm text-muted">
                    {f.destination} · {f.price}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFavorite(f.packageId, f.slug)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === "plans" ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={addPlan} className="space-y-3">
            <h2 className="text-xl text-foreground">Save a travel plan</h2>
            <label className="form-field">
              <span>Title</span>
              <input
                className="form-control"
                value={planForm.title}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </label>
            <label className="form-field">
              <span>Destination</span>
              <input
                className="form-control"
                value={planForm.destination}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, destination: e.target.value }))
                }
                required
              />
            </label>
            <label className="form-field">
              <span>Travel date</span>
              <input
                type="date"
                className="form-control"
                value={planForm.travelDate}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, travelDate: e.target.value }))
                }
              />
            </label>
            <label className="form-field">
              <span>Travellers</span>
              <input
                type="number"
                min={1}
                className="form-control"
                value={planForm.travellers}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, travellers: e.target.value }))
                }
              />
            </label>
            <label className="form-field">
              <span>Budget</span>
              <input
                className="form-control"
                value={planForm.budget}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, budget: e.target.value }))
                }
              />
            </label>
            <label className="form-field form-field-tall">
              <span>Notes</span>
              <textarea
                className="form-control"
                rows={3}
                value={planForm.notes}
                onChange={(e) =>
                  setPlanForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </label>
            <Button type="submit">Save plan</Button>
          </form>

          <div className="space-y-3">
            {plans.length === 0 ? (
              <p className="text-muted">No saved plans yet.</p>
            ) : (
              plans.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-sm text-muted">
                        {p.destination}
                        {p.travelDate ? ` · ${p.travelDate}` : ""} ·{" "}
                        {p.travellers} travellers
                      </p>
                      {p.budget ? (
                        <p className="text-sm text-muted">Budget: {p.budget}</p>
                      ) : null}
                      {p.notes ? (
                        <p className="mt-2 text-sm text-stone-600">{p.notes}</p>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => deletePlan(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      {tab === "trips" ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={addTrip} className="space-y-3">
            <h2 className="text-xl text-foreground">Add a past trip</h2>
            <label className="form-field">
              <span>Trip title</span>
              <input
                className="form-control"
                value={tripForm.title}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </label>
            <label className="form-field">
              <span>Destination</span>
              <input
                className="form-control"
                value={tripForm.destination}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, destination: e.target.value }))
                }
                required
              />
            </label>
            <label className="form-field">
              <span>Travel date</span>
              <input
                type="date"
                className="form-control"
                value={tripForm.travelDate}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, travelDate: e.target.value }))
                }
              />
            </label>
            <label className="form-field form-field-tall">
              <span>Notes</span>
              <textarea
                className="form-control"
                rows={3}
                value={tripForm.notes}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </label>
            <Button type="submit">Add trip</Button>
          </form>

          <div className="space-y-3">
            {trips.length === 0 ? (
              <p className="text-muted">No past trips logged yet.</p>
            ) : (
              trips.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-sm text-muted">
                        {t.destination}
                        {t.travelDate ? ` · ${t.travelDate}` : ""} · {t.status}
                      </p>
                      {t.notes ? (
                        <p className="mt-2 text-sm text-stone-600">{t.notes}</p>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTrip(t.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
