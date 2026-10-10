"use client";

import { FormEvent, useState } from "react";
import { isValidEmail } from "@/lib/enquiry";
import Button from "./Button";
import { useSiteSettings } from "./SiteSettingsProvider";

export default function NewsletterForm() {
  const { company } = useSiteSettings();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }
    setIsError(false);
    const subject = encodeURIComponent(
      `Subscribe me to ${company.name} updates`,
    );
    const body = encodeURIComponent(
      `Please add ${email.trim()} to the ${company.name} travel inspiration list.`,
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setMessage("Opening your email app to confirm subscription.");
    setEmail("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full flex-1 rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-brand"
        aria-label="Email for newsletter"
      />
      <Button type="submit" size="lg">
        Subscribe
      </Button>
      {message ? (
        <p
          className={`sm:absolute sm:bottom-[-1.75rem] sm:left-0 text-sm ${isError ? "text-red-600" : "text-green-700"}`}
          role={isError ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
