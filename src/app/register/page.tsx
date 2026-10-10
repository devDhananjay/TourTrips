"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not create account");
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <section className="section-pad bg-surface">
      <div className="container-page">
        <form
          onSubmit={onSubmit}
          className="mx-auto w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-sm md:p-8"
        >
          <h1 className="text-3xl text-brand">Create your account</h1>
          <p className="mt-2 text-sm text-muted">
            Save plans, mark favourites and keep your travel history in one place.
          </p>

          <label className="form-field mt-6">
            <span>Full name</span>
            <input
              className="form-control"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </label>
          <label className="form-field mt-3">
            <span>Email</span>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </label>
          <label className="form-field mt-3">
            <span>Phone</span>
            <input
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="10-digit mobile"
            />
          </label>
          <label className="form-field mt-3">
            <span>Password</span>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              minLength={6}
              required
            />
          </label>

          {error ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            className="mt-5 w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </Button>

          <p className="mt-4 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
