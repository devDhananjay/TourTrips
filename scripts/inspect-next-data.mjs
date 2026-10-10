/**
 * Fetches a public HTML page and inspects Next.js __NEXT_DATA__ if present.
 * Does not decrypt or modify protected payloads — only parses visible JSON.
 *
 * Usage:
 *   npm install axios cheerio
 *   node scripts/inspect-next-data.mjs
 *   node scripts/inspect-next-data.mjs "https://www.carinfo.app/rc-details/UP26AQ8005"
 */

import axios from "axios";
import * as cheerio from "cheerio";

const DEFAULT_URL = "https://www.carinfo.app/rc-details/UP26AQ8005";
const url = process.argv[2] ?? DEFAULT_URL;

/** Shallow summary of a value for safe console output (no decryption). */
function summarizeValue(value, depth = 0) {
  if (depth > 2) return "[nested]";
  if (value === null) return null;
  if (Array.isArray(value)) {
    return { type: "array", length: value.length };
  }
  const t = typeof value;
  if (t === "string") {
    return { type: "string", length: value.length, preview: value.slice(0, 80) };
  }
  if (t === "number" || t === "boolean") return value;
  if (t === "object") {
    return {
      type: "object",
      keys: Object.keys(value),
    };
  }
  return String(value);
}

function summarizeObject(obj, depth = 0) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return summarizeValue(obj, depth);
  }
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = summarizeValue(v, depth + 1);
  }
  return out;
}

async function main() {
  console.log("GET", url);

  const { status, headers, data: html } = await axios.get(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": "Mozilla/5.0 (compatible; NextDataInspector/1.0)",
    },
    timeout: 30_000,
    validateStatus: () => true,
  });

  console.log("HTTP status:", status);
  console.log("Content-Type:", headers["content-type"] ?? "(none)");
  console.log("HTML length:", typeof html === "string" ? html.length : 0);

  const $ = cheerio.load(html);
  const script = $("script#__NEXT_DATA__");

  if (!script.length) {
    console.log("\n#__NEXT_DATA__ not found.");
    process.exit(0);
  }

  const raw = script.text().trim();
  if (!raw) {
    console.log("\n#__NEXT_DATA__ found but empty.");
    process.exit(0);
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("\nFailed to JSON.parse __NEXT_DATA__:", err.message);
    process.exit(1);
  }

  console.log("\n=== Top-level keys ===");
  console.log(Object.keys(parsed));

  console.log("\n=== Top-level structure (summarized) ===");
  console.log(JSON.stringify(summarizeObject(parsed), null, 2));

  const pageProps = parsed?.props?.pageProps;
  if (pageProps === undefined) {
    console.log("\nprops.pageProps: (missing)");
  } else {
    console.log("\n=== props.pageProps keys ===");
    console.log(Object.keys(pageProps));

    console.log("\n=== props.pageProps structure (summarized) ===");
    console.log(JSON.stringify(summarizeObject(pageProps), null, 2));
  }

  if (parsed.page) console.log("\npage route:", parsed.page);
  if (parsed.query) console.log("query:", parsed.query);
  if (parsed.buildId) console.log("buildId:", parsed.buildId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
