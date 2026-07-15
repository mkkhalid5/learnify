import { ApiErrorResponse, PaginationResponse } from "@/types/api";
import { Category, CategoryFormValues } from "@/types/category";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface UploadResponse {
    secure_url: string;
}

interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: Record<string, unknown>;
}

function buildUrl(path: string): string {
    return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(path), {
        cache: "no-store",
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
    });

    const payload: ApiEnvelope<T> = await response.json() as ApiEnvelope<T>;

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

export async function fetchCategories(searchParams: {
    search?: string;
    page?: number;
    limit?: number;
}): Promise<PaginationResponse<Category>> {
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
    return await requestJson<PaginationResponse<Category>>(`/categories${suffix}`);
}

export async function fetchCategoryById(id: string): Promise<Category> {
    return await requestJson<Category>(`/categories/${id}`);
}

export async function createCategory(values: CategoryFormValues): Promise<Category> {
    return await requestJson<Category>("/categories", {
        method: "POST",
        body: JSON.stringify(values),
    });
}

export async function updateCategory(id: string, values: CategoryFormValues): Promise<Category> {
    return await requestJson<Category>(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
    });
}

export async function deleteCategory(id: string): Promise<void> {
    await requestJson<unknown>(`/categories/${id}`, {
        method: "DELETE",
    });
}

export async function uploadCategoryImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(buildUrl("/upload"), {
        method: "POST",
        body: formData,
    });

    const payload: ApiEnvelope<UploadResponse> = await response.json() as ApiEnvelope<UploadResponse>;

    if (!response.ok || payload.success === false || !payload.data?.secure_url) {
        throw new Error(payload.message || "Image upload failed");
    }

    return payload.data.secure_url;
}

export function toSlug(value: string): string {
    const normalized = value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return normalized.length > 0 ? normalized : "category";
}