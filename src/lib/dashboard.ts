import { DashboardSummary } from "@/types/dashboard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Record<string, unknown>;
}

async function requestJson<T>(path: string, cookieHeader?: string | null): Promise<T> {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}${path}`, {
        cache: "no-store",
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    const payload: ApiEnvelope<T> = (await response.json()) as ApiEnvelope<T>;

    if (!response.ok || payload.success === false || payload.data === undefined) {
        throw new Error(payload.message || "Request failed");
    }

    return payload.data;
}

/**
 * GET /dashboard/summary requires an admin session. When called from a
 * Server Component, pass the incoming requests cookie header (e.g. via
 * (await headers()).get("cookie")) so the Express API can see it -- a
 * server-side fetch does not automatically forward the browsers cookies.
 */
export async function fetchDashboardSummary(cookieHeader?: string | null): Promise<DashboardSummary> {
    return await requestJson<DashboardSummary>("/dashboard/summary", cookieHeader);
}