import { PaginationResponse } from "@/types/api";
import { Enrollment, EnrollmentStatus } from "@/types/enrollment";
import { API_BASE_URL } from "@/lib/api-base";

interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Record<string, unknown>;
}

function buildUrl(path: string): string {
    return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function requestJson<T>(
    path: string,
    init?: RequestInit,
    cookieHeader?: string | null
): Promise<T> {
    const response = await fetch(buildUrl(path), {
        cache: "no-store",
        credentials: "include",
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            "Content-Type": "application/json",
            ...(cookieHeader ? { cookie: cookieHeader } : {}),
        },
    });

    const payload: ApiEnvelope<T> = (await response.json()) as ApiEnvelope<T>;

    if (!response.ok || payload.success === false) {
        throw new Error(payload.message || "Request failed");
    }

    return payload.data as T;
}

export async function enrollInCourse(courseId: string): Promise<Enrollment> {
    return await requestJson<Enrollment>("/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId }),
    });
}

/**
 * `GET /enrollments` requires a signed-in session. When called from a
 * Server Component, pass the incoming request's `cookie` header (e.g. via
 * `(await headers()).get("cookie")`) so the Express API can see it — a
 * server-side `fetch` does not automatically forward the browser's cookies.
 */
export async function fetchMyEnrollments(
    searchParams?: {
        page?: number;
        limit?: number;
    },
    cookieHeader?: string | null
): Promise<PaginationResponse<Enrollment>> {
    const query = new URLSearchParams();

    if (searchParams?.page) {
        query.set("page", String(searchParams.page));
    }

    if (searchParams?.limit) {
        query.set("limit", String(searchParams.limit));
    }

    const suffix = query.toString().length > 0 ? `?${query.toString()}` : "";
    return await requestJson<PaginationResponse<Enrollment>>(`/enrollments${suffix}`, undefined, cookieHeader);
}

export async function fetchEnrollmentStatus(courseId: string): Promise<EnrollmentStatus> {
    return await requestJson<EnrollmentStatus>(`/enrollments/${courseId}`);
}
