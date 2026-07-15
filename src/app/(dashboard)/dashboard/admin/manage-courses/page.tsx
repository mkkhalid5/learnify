import CourseFilters from "@/components/admin/courses/CourseFilters";
import CoursePagination from "@/components/admin/courses/CoursePagination";
import CourseTable from "@/components/admin/courses/CourseTable";
import EmptyState from "@/components/admin/courses/EmptyState";
import SearchBar from "@/components/admin/courses/SearchBar";
import { fetchCategories } from "@/lib/categories";
import { fetchCourses } from "@/lib/courses";
import { Category } from "@/types/category";
import { AdminCourse } from "@/types/course";
import Link from "next/link";

interface ManageCoursesPageProps {
    searchParams?: Promise<{
        search?: string | string[];
        category?: string | string[];
        level?: string | string[];
        status?: string | string[];
        sort?: string | string[];
        page?: string | string[];
        limit?: string | string[];
    }>;
}

function readParam(value: string | string[] | undefined): string {
    if (Array.isArray(value)) {
        return value[0] ?? "";
    }

    return value ?? "";
}

function readNumberParam(value: string | string[] | undefined, fallback: number): number {
    const rawValue = readParam(value);
    if (!rawValue) {
        return fallback;
    }

    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return fallback;
    }

    return Math.floor(parsed);
}

export default async function ManageCoursesPage({ searchParams }: ManageCoursesPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const search = readParam(resolvedSearchParams.search).trim();
    const category = readParam(resolvedSearchParams.category).trim();
    const level = readParam(resolvedSearchParams.level).trim();
    const status = readParam(resolvedSearchParams.status).trim();
    const sort = readParam(resolvedSearchParams.sort).trim() || "newest";
    const page = readNumberParam(resolvedSearchParams.page, 1);
    const limit = readNumberParam(resolvedSearchParams.limit, 10);

    let courses: AdminCourse[] = [];
    let categories: Category[] = [];
    let totalPages = 1;
    let errorMessage = "";

    try {
        const [courseResponse, categoryResponse] = await Promise.all([
            fetchCourses({
                search: search.length > 0 ? search : undefined,
                category: category.length > 0 ? category : undefined,
                level: level.length > 0 ? level : undefined,
                status: status.length > 0 ? status : undefined,
                sort,
                page,
                limit,
            }),
            fetchCategories({ limit: 100 }),
        ]);

        courses = courseResponse.data;
        totalPages = courseResponse.totalPages;
        categories = categoryResponse.data;
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Failed to load courses";
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                        Admin / Courses
                    </p>
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950">Manage Courses</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Search, filter, create, edit, and delete courses.
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/admin/add-course"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    + Add Course
                </Link>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <SearchBar defaultValue={search} />

                <CourseFilters
                    categories={categories}
                    currentCategory={category}
                    currentLevel={level}
                    currentStatus={status}
                    currentSort={sort}
                />
            </div>

            {errorMessage ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{errorMessage}</div>
            ) : courses.length > 0 ? (
                <>
                    <CourseTable courses={courses} />
                    <CoursePagination
                        currentPage={page}
                        totalPages={totalPages}
                        search={search}
                        category={category}
                        level={level}
                        status={status}
                        sort={sort}
                        limit={limit}
                    />
                </>
            ) : (
                <EmptyState
                    title="No courses found"
                    description="Create a new course or adjust the filters to find content."
                    actionHref="/dashboard/admin/add-course"
                    actionLabel="Create Course"
                />
            )}
        </div>
    );
}