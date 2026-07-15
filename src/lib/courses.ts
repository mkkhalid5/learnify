import { PaginationResponse } from "@/types/api";
import { AdminCourse, CourseFormValues } from "@/types/course";
import { API_BASE_URL } from "@/lib/api-base";

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
    expectData: boolean = true
): Promise<T> {
    const response = await fetch(buildUrl(path), {
        cache: "no-store",
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
    });

    const payload: ApiEnvelope<T> = (await response.json()) as ApiEnvelope<T>;

    if (!response.ok || payload.success === false || (expectData && payload.data === undefined)) {
        throw new Error(payload.message || "Request failed");
    }

    return payload.data as T;
}

export async function fetchCourses(searchParams: {
    search?: string;
    category?: string;
    level?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
}): Promise<PaginationResponse<AdminCourse>> {
    const query = new URLSearchParams();

    if (searchParams.search) {
        query.set("search", searchParams.search);
    }

    if (searchParams.category) {
        query.set("category", searchParams.category);
    }

    if (searchParams.level) {
        query.set("level", searchParams.level);
    }

    if (searchParams.status) {
        query.set("status", searchParams.status);
    }

    if (searchParams.sort) {
        query.set("sort", searchParams.sort);
    }

    if (searchParams.page) {
        query.set("page", String(searchParams.page));
    }

    if (searchParams.limit) {
        query.set("limit", String(searchParams.limit));
    }

    const suffix = query.toString().length > 0 ? `?${query.toString()}` : "";
    return await requestJson<PaginationResponse<AdminCourse>>(`/courses${suffix}`);
}

export async function fetchCourseById(id: string): Promise<AdminCourse> {
    return await requestJson<AdminCourse>(`/courses/${id}`);
}

export async function createCourse(values: CourseFormValues): Promise<AdminCourse> {
    const payload = toApiPayload(values);
    return await requestJson<AdminCourse>("/courses", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updateCourse(id: string, values: CourseFormValues): Promise<AdminCourse> {
    const payload = toApiPayload(values);
    return await requestJson<AdminCourse>(`/courses/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export async function deleteCourse(id: string): Promise<void> {
    await requestJson<unknown>(
        `/courses/${id}`,
        {
        method: "DELETE",
        },
        false
    );
}

export async function uploadCourseThumbnail(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(buildUrl("/upload"), {
        method: "POST",
        body: formData,
    });

    const payload: ApiEnvelope<UploadResponse> = (await response.json()) as ApiEnvelope<UploadResponse>;

    if (!response.ok || payload.success === false || !payload.data?.secure_url) {
        throw new Error(payload.message || "Thumbnail upload failed");
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

    return normalized.length > 0 ? normalized : "course";
}

function toApiPayload(values: CourseFormValues): Record<string, unknown> {
    return {
        ...values,
        price: Number(values.price),
        discountPrice: values.discountPrice.trim().length > 0 ? Number(values.discountPrice) : null,
        totalLessons: Number(values.totalLessons),
        totalStudents: Number(values.totalStudents),
        requirements: values.requirements,
        outcomes: values.outcomes,
    };
}