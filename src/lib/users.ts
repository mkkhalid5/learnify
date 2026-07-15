import { PaginationResponse } from "@/types/api";

export type UserRole = "admin" | "user";

export interface AppUser {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Record<string, unknown>;
}

interface UploadResponse {
    secure_url: string;
}

function buildUrl(path: string): string {
    return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function requestJson<T>(
    path: string,
    init?: RequestInit,
    expectData: boolean = true,
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

    if (!response.ok || payload.success === false || (expectData && payload.data === undefined)) {
        throw new Error(payload.message || "Request failed");
    }

    return payload.data as T;
}

/**
 * `GET /users` requires an admin session. When called from a Server
 * Component, pass the incoming request's `cookie` header (e.g. via
 * `(await headers()).get("cookie")`) so the Express API can see it — a
 * server-side `fetch` does not automatically forward the browser's cookies.
 */
export async function fetchUsers(
    searchParams: {
        search?: string;
        page?: number;
        limit?: number;
    },
    cookieHeader?: string | null
): Promise<PaginationResponse<AppUser>> {
    const query = new URLSearchParams();

    if (searchParams.search) {
        query.set("search", searchParams.search);
    }

    if (searchParams.page) {
        query.set("page", String(searchParams.page));
    }

    if (searchParams.limit) {
        query.set("limit", String(searchParams.limit));
    }

    const suffix = query.toString().length > 0 ? `?${query.toString()}` : "";
    return await requestJson<PaginationResponse<AppUser>>(`/users${suffix}`, undefined, true, cookieHeader);
}

export async function deleteUser(id: string): Promise<void> {
    await requestJson<unknown>(
        `/users/${id}`,
        {
            method: "DELETE",
        },
        false
    );
}

export async function updateUserRole(id: string, role: UserRole): Promise<AppUser> {
    return await requestJson<AppUser>(`/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
    });
}

export async function uploadUserImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(buildUrl("/upload"), {
        method: "POST",
        body: formData,
    });

    const payload: ApiEnvelope<UploadResponse> = (await response.json()) as ApiEnvelope<UploadResponse>;

    if (!response.ok || payload.success === false || !payload.data?.secure_url) {
        throw new Error(payload.message || "Image upload failed");
    }

    return payload.data.secure_url;
}
