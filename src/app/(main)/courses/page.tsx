import CourseFilters from "@/components/student/courses/CourseFilters";
import CourseGrid from "@/components/student/courses/CourseGrid";
import CourseListHeader from "@/components/student/courses/CourseListHeader";
import CoursePagination from "@/components/student/courses/CoursePagination";
import EmptyState from "@/components/admin/courses/EmptyState";
import { fetchCategories } from "@/lib/categories";
import { fetchCourses } from "@/lib/courses";
import { Category } from "@/types/category";
import { AdminCourse } from "@/types/course";

interface CoursesPageProps {
    searchParams?: Promise<{
        search?: string | string[];
        category?: string | string[];
        level?: string | string[];
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

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const search = readParam(resolvedSearchParams.search).trim();
    const category = readParam(resolvedSearchParams.category).trim();
    const level = readParam(resolvedSearchParams.level).trim();
    const sort = readParam(resolvedSearchParams.sort).trim() || "newest";
    const page = readNumberParam(resolvedSearchParams.page, 1);
    const limit = readNumberParam(resolvedSearchParams.limit, 9);

    let courses: AdminCourse[] = [];
    let categories: Category[] = [];
    let totalPages = 1;
    let totalCourses = 0;
    let errorMessage = "";

    try {
        const [courseResponse, categoryResponse] = await Promise.all([
            fetchCourses({
                search: search.length > 0 ? search : undefined,
                category: category.length > 0 ? category : undefined,
                level: level.length > 0 ? level : undefined,
                sort,
                page,
                limit,
                status: "published",
            }),
            fetchCategories({ limit: 100 }),
        ]);

        courses = courseResponse.data;
        totalPages = courseResponse.totalPages;
        totalCourses = courseResponse.total;
        categories = categoryResponse.data;
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Failed to load courses";
    }

    return (
        <div className="space-y-8 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CourseListHeader total={totalCourses} />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CourseFilters
                    categories={categories}
                    currentSearch={search}
                    currentCategory={category}
                    currentLevel={level}
                    currentSort={sort}
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {errorMessage ? (
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                        {errorMessage}
                    </div>
                ) : courses.length > 0 ? (
                    <div className="space-y-6">
                        <CourseGrid courses={courses} />
                        <CoursePagination
                            currentPage={page}
                            totalPages={totalPages}
                            search={search}
                            category={category}
                            level={level}
                            sort={sort}
                            limit={limit}
                        />
                    </div>
                ) : (
                    <EmptyState
                        title="No courses found"
                        description="Try adjusting the search term, category, or level filters."
                        actionHref="/courses"
                        actionLabel="Reset Filters"
                    />
                )}
            </div>
        </div>
    );
}