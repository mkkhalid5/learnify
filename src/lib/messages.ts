import { ApiErrorResponse, PaginationResponse } from "@/types/api";
import { ContactMessage, ContactMessageFormValues } from "@/types/message";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

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
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            "Content-Type": "application/json",
            ...(cookieHeader ? { cookie: cookieHeader } : {}),
        },
    });

    const payload: ApiEnvelope<T> = (await response.json()) as ApiEnvelope<T>;

    if (!response.ok || payload.success === false) {
        const errorMessage = payload.message || "Request failed";
        const apiError: ApiErrorResponse = {
            success: false,
            message: errorMessage,
            error: payload.error ?? {},
        };

        throw new Error(apiError.message);
    }

    return payload.data as T;
}

export async function sendContactMessage(
    values: ContactMessageFormValues
): Promise<ContactMessage> {
    return await requestJson<ContactMessage>("/messages", {
        method: "POST",
        body: JSON.stringify(values),
    });
}

/**
 * `GET /messages` requires an admin session. When called from a Server
 * Component, pass the incoming request's `cookie` header (e.g. via
 * `(await headers()).get("cookie")`) so the Express API can see it — a
 * server-side `fetch` does not automatically forward the browser's cookies.
 */
export async function fetchMessages(
    searchParams: {
        search?: string;
        status?: "new" | "read";
        page?: number;
        limit?: number;
    },
    cookieHeader?: string | null
): Promise<PaginationResponse<ContactMessage>> {
    const query = new URLSearchParams();

    if (searchParams.search) {
        query.set("search", searchParams.search);
    }

    if (searchParams.status) {
        query.set("status", searchParams.status);
    }

    if (searchParams.page) {
        query.set("page", String(searchParams.page));
    }

    if (searchParams.limit) {
        query.set("limit", String(searchParams.limit));
    }

    const suffix = query.toString().length > 0 ? `?${query.toString()}` : "";
    return await requestJson<PaginationResponse<ContactMessage>>(`/messages${suffix}`, undefined, cookieHeader);
}

export async function markMessageStatus(
    id: string,
    status: "new" | "read"
): Promise<ContactMessage> {
    return await requestJson<ContactMessage>(`/messages/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    });
}

export async function deleteMessage(id: string): Promise<void> {
    await requestJson<unknown>(`/messages/${id}`, {
        method: "DELETE",
    });
}
