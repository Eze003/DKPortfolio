import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SECRET = process.env.SESSION_SECRET ?? "changeme";

/**
 * Signs a simple HMAC-less token (value + secret hash) using Web Crypto.
 * Good enough for a personal admin panel.
 */
async function sign(value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  const b64 = Buffer.from(sig).toString("base64url");
  return `${value}.${b64}`;
}

async function verify(token: string): Promise<boolean> {
  const [value] = token.split(".");
  const expected = await sign(value);
  return expected === token;
}

export async function createSession(): Promise<void> {
  const token = await sign("admin");
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verify(token);
}
