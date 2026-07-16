import { dataDelete, dataGet, dataPatch, dataPost, uploadImage } from "@/lib/data";
import { PaginationResponse } from "@/types/api";
import { AdminCourse, CourseFormValues } from "@/types/course";

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

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            query.set(key, String(value));
        }
    });

    const suffix = query.toString() ? `?${query}` : "";

    return dataGet<PaginationResponse<AdminCourse>>(`/courses${suffix}`);
}

export function fetchCourseById(id: string): Promise<AdminCourse> {
    return dataGet<AdminCourse>(`/courses/${id}`);
}

export function createCourse(values: CourseFormValues): Promise<AdminCourse> {
    return dataPost<AdminCourse>(
        "/courses",
        toApiPayload(values)
    );
}

export function updateCourse(
    id: string,
    values: CourseFormValues
): Promise<AdminCourse> {
    return dataPatch<AdminCourse>(
        `/courses/${id}`,
        toApiPayload(values)
    );
}

export function deleteCourse(id: string): Promise<void> {
    return dataDelete(`/courses/${id}`);
}

export function uploadCourseThumbnail(file: File): Promise<string> {
    return uploadImage("/upload", file);
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
        discountPrice:
            values.discountPrice.trim().length > 0
                ? Number(values.discountPrice)
                : null,
        totalLessons: Number(values.totalLessons),
        totalStudents: Number(values.totalStudents),
        requirements: values.requirements,
        outcomes: values.outcomes,
    };
}