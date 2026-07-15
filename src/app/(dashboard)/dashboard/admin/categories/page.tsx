import CategoryPagination from "@/components/admin/categories/CategoryPagination";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import EmptyState from "@/components/admin/categories/EmptyState";
import SearchBar from "@/components/admin/categories/SearchBar";
import { fetchCategories } from "@/lib/categories";
import { PaginationResponse } from "@/types/api";
import { Category } from "@/types/category";
import Link from "next/link";

interface CategoriesPageProps {
    searchParams?: Promise<{
        search?: string | string[];
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

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const search = readParam(resolvedSearchParams.search).trim();
    const page = readNumberParam(resolvedSearchParams.page, 1);
    const limit = readNumberParam(resolvedSearchParams.limit, 10);

    let categories: PaginationResponse<Category> | null = null;
    let errorMessage = "";

    try {
        categories = await fetchCategories({
            search: search.length > 0 ? search : undefined,
            page,
            limit,
        });
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Failed to load categories";
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                        Admin / Categories
                    </p>
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950">
                            Categories
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Create, edit, search, and remove course categories.
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/admin/categories/create"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    + Add Category
                </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <SearchBar defaultValue={search} />
            </div>

            {errorMessage ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {errorMessage}
                </div>
            ) : categories && categories.data.length > 0 ? (
                <>
                    <CategoryTable categories={categories.data} />
                    <CategoryPagination
                        currentPage={categories.page}
                        totalPages={categories.totalPages}
                        search={search}
                        limit={categories.limit}
                    />
                </>
            ) : (
                <EmptyState
                    title="No categories found"
                    description="Add the first category to start organizing your courses."
                    actionHref="/dashboard/admin/categories/create"
                    actionLabel="Create Category"
                />
            )}
        </div>
    );
}