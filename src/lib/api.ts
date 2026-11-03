import { authClient } from "./auth-client";
import type { IEvent } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export type ApiMsg = { msg?: string };


async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getEvents(type = "all", search = ""): Promise<IEvent[]> {
  const qs = new URLSearchParams();
  if (type && type !== "all") qs.set("type", type);
  if (search) qs.set("search", search);
  const q = qs.toString();
  return (await getJson<IEvent[]>(`/events${q ? `?${q}` : ""}`)) ?? [];
}

export async function getFeaturedEvents(): Promise<IEvent[]> {
  return (await getJson<IEvent[]>("/featured-events")) ?? [];
}

export async function getEventById(id: string): Promise<IEvent | null> {
  return getJson<IEvent>(`/event/${id}`);
}


export async function authFetch<T = ApiMsg>(path: string, init: RequestInit = {}) {
  type Data = T & ApiMsg;
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    if (!token) {
      return { ok: false, status: 401, data: { msg: "Please log in again." } as unknown as Data };
    }
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await res.json().catch(() => ({}))) as Data;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: { msg: "Could not reach the server." } as unknown as Data };
  }
}