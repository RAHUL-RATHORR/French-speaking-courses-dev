import { headers } from "next/headers";

export function getRequestOrigin(): string {
  const h = headers();
  const forwardedProto = h.get("x-forwarded-proto");
  const forwardedHost = h.get("x-forwarded-host");
  const host = forwardedHost ?? h.get("host");
  const proto = forwardedProto ?? "http";

  if (host) return `${proto}://${host}`;

  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
