"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { budgetOptions } from "@/data/company";
import { destinations } from "@/data/destinations";
import {
  buildEnquiryMessage,
  isValidIndianMobile,
  openWhatsAppEnquiry,
  todayISODate,
} from "@/lib/enquiry";
import Button from "./Button";

export default function HeroEnquiryForm({ className }: { className?: string }) {
  const minDate = todayISODate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
    travelDate: "",
    travellers: "2",
    budget: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidIndianMobile(form.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!form.destination || !form.travelDate || !form.budget) {
      setError("Please fill destination, travel date and budget.");
      return;
    }
    if (form.travelDate < minDate) {
      setError("Travel date cannot be in the past.");
      return;
    }

    const travellers = Number(form.travellers);
    if (!travellers || travellers < 1 || travellers > 50) {
      setError("Number of travellers should be between 1 and 50.");
      return;
    }

    setSubmitting(true);

    openWhatsAppEnquiry(
      buildEnquiryMessage({
        name: form.name,
        phone: form.phone,
        destination: form.destination,
        travelDate: form.travelDate,
        travellers: form.travellers,
        budget: form.budget,
      }),
    );

    setSuccess(
      "Opening WhatsApp with your trip details. Send the message so we can share a free quote.",
    );
    setForm({
      name: "",
      phone: "",
      destination: "",
      travelDate: "",
      travellers: "2",
      budget: "",
    });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-3xl border border-border bg-white p-5 shadow-[0_20px_60px_rgba(26,71,137,0.12)] md:p-8 ${className || ""}`}
      noValidate
    >
      <h2 className="text-2xl text-brand md:text-3xl">Plan your trip</h2>
      <p className="mt-2 text-sm text-muted md:text-base">
        Share a few details — we&apos;ll open WhatsApp so a travel expert can
        reply with hotels, transfers and a personalised quote.
      </p>

      <div className="mt-5 grid items-start gap-3 sm:grid-cols-2">
        <label className="form-field">
          <span>Your Name *</span>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="form-control"
            placeholder="Full name"
            autoComplete="name"
          />
        </label>

        <label className="form-field">
          <span>Phone *</span>
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="form-control"
            placeholder="10-digit mobile"
            inputMode="numeric"
            autoComplete="tel"
          />
        </label>

        <label className="form-field">
          <span>Destination</span>
          <select
            value={form.destination}
            onChange={(e) =>
              setForm((f) => ({ ...f, destination: e.target.value }))
            }
            className="form-control"
          >
            <option value="">Select destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="form-field">
          <span>Travel Date</span>
          <input
            type="date"
            min={minDate}
            value={form.travelDate}
            onChange={(e) =>
              setForm((f) => ({ ...f, travelDate: e.target.value }))
            }
            className="form-control"
          />
        </label>

        <label className="form-field">
          <span>Number of Travellers</span>
          <input
            type="number"
            min={1}
            max={50}
            value={form.travellers}
            onChange={(e) =>
              setForm((f) => ({ ...f, travellers: e.target.value }))
            }
            className="form-control"
          />
        </label>

        <label className="form-field">
          <span>Budget</span>
          <select
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
            className="form-control"
          >
            <option value="">Select budget</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mt-3 text-sm text-green-700" role="status">
          {success}
        </p>
      ) : null}

      <Button
        type="submit"
        className="mt-4 w-full"
        size="lg"
        disabled={submitting}
      >
        <MessageCircle className="h-4 w-4" />
        {submitting ? "Opening WhatsApp..." : "Get Free Quote on WhatsApp"}
      </Button>
    </form>
  );
}
