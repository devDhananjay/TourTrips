"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import {
  buildEnquiryMessage,
  isValidEmail,
  isValidIndianMobile,
  openWhatsAppEnquiry,
  todayISODate,
} from "@/lib/enquiry";
import Button from "./Button";

type ContactFormProps = {
  packageName?: string;
  compact?: boolean;
};

export default function ContactForm({ packageName, compact }: ContactFormProps) {
  const searchParams = useSearchParams();
  const packageFromQuery = searchParams.get("package");
  const routeFromQuery = searchParams.get("route");
  const tripFromQuery = searchParams.get("trip");
  const cabinFromQuery = searchParams.get("cabin");
  const destSlugFromQuery = searchParams.get("destination");
  const dateFromQuery = searchParams.get("date");
  const travellersFromQuery = searchParams.get("travellers");
  const fromFromQuery = searchParams.get("from");
  const minDate = todayISODate();

  const matchedPackage = useMemo(() => {
    if (packageName) {
      return packages.find((p) => p.name === packageName);
    }
    if (!packageFromQuery) return undefined;
    return packages.find((p) => p.slug === packageFromQuery);
  }, [packageName, packageFromQuery]);

  const prefilledPackage = matchedPackage?.name || packageName || "";

  const destinationFromQuery = useMemo(() => {
    if (matchedPackage?.destination) return matchedPackage.destination;
    if (!destSlugFromQuery) return "";
    return (
      destinations.find((d) => d.slug === destSlugFromQuery)?.name ||
      destSlugFromQuery
    );
  }, [matchedPackage, destSlugFromQuery]);

  const multiCityMessage = useMemo(() => {
    if (!routeFromQuery && tripFromQuery !== "multicity") return "";
    const bits = [
      "Hi, I want a Multi City holiday quote.",
      fromFromQuery ? `Starting from: ${fromFromQuery}` : "",
      routeFromQuery ? `Route: ${routeFromQuery}` : "",
      cabinFromQuery ? `Cabin: ${cabinFromQuery}` : "",
      "Please share hotels, flights and a custom itinerary.",
    ].filter(Boolean);
    return bits.join("\n");
  }, [routeFromQuery, tripFromQuery, fromFromQuery, cabinFromQuery]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: destinationFromQuery || "",
    travelDate: dateFromQuery || "",
    travellers: travellersFromQuery || "2",
    message: multiCityMessage
      ? multiCityMessage
      : prefilledPackage
        ? `I am interested in the "${prefilledPackage}" package.`
        : "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    if (!form.name.trim() || form.name.trim().length < 2) {
      return "Please enter your full name.";
    }
    if (!isValidIndianMobile(form.phone)) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!isValidEmail(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!form.destination) {
      return "Please select a destination.";
    }
    if (!form.travelDate) {
      return "Please select your travel date.";
    }
    if (form.travelDate < minDate) {
      return "Travel date cannot be in the past.";
    }
    const travellers = Number(form.travellers);
    if (!travellers || travellers < 1 || travellers > 50) {
      return "Travellers should be between 1 and 50.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      return "Please share a short message (at least 10 characters).";
    }
    return "";
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");

    const message = buildEnquiryMessage({
      name: form.name,
      phone: form.phone,
      email: form.email,
      destination: form.destination,
      travelDate: form.travelDate,
      travellers: form.travellers,
      message: form.message,
      packageName: prefilledPackage || undefined,
    });

    openWhatsAppEnquiry(message);

    setSuccess(
      "Opening WhatsApp with your enquiry. Send the message so our travel expert can reply shortly.",
    );
    setForm({
      name: "",
      phone: "",
      email: "",
      destination: matchedPackage?.destination || "",
      travelDate: "",
      travellers: "2",
      message: prefilledPackage
        ? `I am interested in the "${prefilledPackage}" package.`
        : "",
    });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-border bg-white p-5 shadow-sm md:p-6 ${compact ? "" : ""}`}
      noValidate
    >
      <h2 className="text-2xl text-brand">Send an Enquiry</h2>
      <p className="mt-1 text-sm text-muted">
        Submit opens WhatsApp with your details — we typically reply within a
        few working hours.
      </p>

      <div className="mt-5 grid items-start gap-4 sm:grid-cols-2">
        <label className="form-field">
          <span>Name *</span>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="form-control"
            placeholder="Your full name"
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
        <label className="form-field sm:col-span-2">
          <span>Email *</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="form-control"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label className="form-field">
          <span>Destination *</span>
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
          <span>Travel Date *</span>
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
          <span>Travellers *</span>
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
        <label className="form-field form-field-tall sm:col-span-2">
          <span>Message *</span>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className="form-control"
            placeholder="Tell us about your preferred dates, budget or special requests"
          />
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
        className="mt-5 w-full"
        size="lg"
        disabled={submitting}
      >
        <MessageCircle className="h-4 w-4" />
        {submitting ? "Opening WhatsApp..." : "Submit Enquiry on WhatsApp"}
      </Button>
    </form>
  );
}
