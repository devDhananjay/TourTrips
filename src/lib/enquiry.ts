import { whatsappLink } from "@/data/company";

export function todayISODate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildEnquiryMessage(parts: {
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelDate: string;
  travellers: string | number;
  budget?: string;
  message?: string;
  packageName?: string;
}): string {
  const lines = [
    "Hi Yogo Voyage! I would like to send an enquiry.",
    "",
    `Name: ${parts.name.trim()}`,
    `Phone: ${parts.phone.replace(/\s+/g, "")}`,
  ];

  if (parts.email?.trim()) {
    lines.push(`Email: ${parts.email.trim()}`);
  }
  if (parts.packageName?.trim()) {
    lines.push(`Package: ${parts.packageName.trim()}`);
  }

  lines.push(
    `Destination: ${parts.destination}`,
    `Travel date: ${parts.travelDate}`,
    `Travellers: ${parts.travellers}`,
  );

  if (parts.budget?.trim()) {
    lines.push(`Budget: ${parts.budget.trim()}`);
  }
  if (parts.message?.trim()) {
    lines.push("", `Message: ${parts.message.trim()}`);
  }

  return lines.join("\n");
}

/** Opens WhatsApp with the enquiry text. Returns false if popup blocked. */
export function openWhatsAppEnquiry(message: string): boolean {
  const url = whatsappLink(message);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    window.location.href = url;
    return true;
  }
  return true;
}
