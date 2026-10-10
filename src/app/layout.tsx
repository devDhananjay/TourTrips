import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { company } from "@/data/company";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yogovoyage.com"),
  title: {
    default: `${company.name} | Tour & Travel Packages India`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "Yogo Voyage",
    "India travel agency",
    "tour packages",
    "Goa packages",
    "Manali tour",
    "Kashmir holiday",
    "Kerala backwaters",
    "Dubai tour from India",
    "honeymoon packages",
  ],
  openGraph: {
    title: company.name,
    description: company.tagline,
    type: "website",
    locale: "en_IN",
    images: [{ url: company.logo }],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
