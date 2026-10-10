"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Button from "@/components/Button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }
    router.push(data.user?.role === "SUPERADMIN" ? "/admin" : next);
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-sm md:p-8"
    >
      <h1 className="text-3xl text-brand">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">
        Log in to manage favourites, travel plans and past trips.
      </p>

      <label className="form-field mt-6">
        <span>Email</span>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="form-field mt-3">
        <span>Password</span>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="mt-5 w-full" size="lg" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="mt-4 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="font-semibold text-brand hover:underline">
          Create account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-page">
        <Suspense fallback={<p className="text-center text-muted">Loading...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
