import http from "node:http";
import { URL } from "node:url";
import { toErrorResponse } from "./src/lib/errors.mjs";
import { logger } from "./src/lib/logger.mjs";
import { vehicleRateLimiter } from "./src/lib/rate-limit.mjs";
import {
  getActiveProviderName,
  getHealthProviders,
  getProviderStatus,
} from "./src/providers/index.mjs";
import { lookupVehicle } from "./src/service.mjs";

const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || "0.0.0.0";

function clientKey(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.trim()) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function sendJson(res, status, body, extraHeaders = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
    ...extraHeaders,
  });
  res.end(JSON.stringify(body, null, 2));
}

async function handleRequest(req, res) {
  const requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, {
      ok: false,
      error: { code: "METHOD_NOT_ALLOWED", message: "Method not allowed" },
    });
    return;
  }

  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  logger.info("http.request", { requestId, method: req.method, path: url.pathname });

  if (url.pathname === "/health") {
    sendJson(res, 200, {
      ok: true,
      providers: getHealthProviders(),
      activeProvider: getActiveProviderName(),
      providerStatus: getProviderStatus(),
      rateLimit: vehicleRateLimiter.stats(),
    });
    return;
  }

  const vehicleMatch = url.pathname.match(/^\/api\/(?:vehicle|rc)\/([^/]+)\/?$/i);
  const isVehicleQuery = url.pathname === "/api/vehicle" || url.pathname === "/api/rc";

  if (isVehicleQuery || vehicleMatch) {
    const rawRc =
      vehicleMatch?.[1] != null
        ? decodeURIComponent(vehicleMatch[1])
        : url.searchParams.get("rc") ?? url.searchParams.get("vehicle");

    try {
      const result = await lookupVehicle(rawRc, {
        rateLimitKey: `ip:${clientKey(req)}`,
        timeoutMs: url.searchParams.get("timeoutMs") || undefined,
        provider: url.searchParams.get("provider") || undefined,
        debug: url.searchParams.get("debug") === "1",
      });
      sendJson(res, 200, result);
    } catch (err) {
      const { status, body } = toErrorResponse(err, {
        includeDetails: url.searchParams.get("debug") === "1",
      });
      const headers = {};
      if (status === 429) headers["Retry-After"] = "60";
      logger.warn("http.lookup_failed", {
        requestId,
        status,
        code: body.error?.code,
        message: err.message,
      });
      sendJson(res, status, body, headers);
    }
    return;
  }

  sendJson(res, 404, {
    ok: false,
    error: { code: "NOT_FOUND", message: "Not found" },
    routes: [
      "GET /health",
      "GET /api/vehicle/UP26AQ8005",
      "GET /api/vehicle?rc=UP26AQ8005",
    ],
  });
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((err) => {
    logger.error("http.unhandled", { message: err.message });
    const { status, body } = toErrorResponse(err);
    sendJson(res, status, body);
  });
});

server.listen(PORT, HOST, () => {
  logger.info("server.listen", {
    host: HOST,
    port: PORT,
    activeProvider: getActiveProviderName(),
  });
});
