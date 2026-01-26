import { json } from "react-router";

const IPRATE_LIMIT = 20; // Max 20 requests per 10 seconds
const IP_RATE_LIMIT_DURATION = 10000; // 10 seconds in milliseconds
const ipRequestCounts = new Map<string, number[]>();

export const checkRateLimit = (request: Request) => {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const now = Date.now();

  const requests = (ipRequestCounts.get(ip) || []).filter(
    (timestamp) => now - timestamp < IP_RATE_LIMIT_DURATION,
  );

  if (requests.length >= IPRATE_LIMIT) {
    return json({ error: "Too many requests" }, { status: 429 });
  }

  requests.push(now);
  ipRequestCounts.set(ip, requests);

  return null;
};
