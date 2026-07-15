import { headers } from "next/headers";

import SearchBar from "@/components/admin/users/SearchBar";
import UserTable from "@/components/admin/users/UserTable";
import UserPagination from "@/components/admin/users/UserPagination";
import EmptyState from "@/components/admin/categories/EmptyState";
import { fetchUsers } from "@/lib/users";
import { PaginationResponse } from "@/types/api";
import { AppUser } from "@/lib/users";

interface UsersPageProps {
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

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const search = readParam(resolvedSearchParams.search).trim();
    const page = readNumberParam(resolvedSearchParams.page, 1);
    const limit = readNumberParam(resolvedSearchParams.limit, 10);

    let users: PaginationResponse<AppUser> | null = null;
    let errorMessage = "";

    try {
        const cookieHeader = (await headers()).get("cookie");
        users = await fetchUsers(
            {
                search: search.length > 0 ? search : undefined,
                page,
                limit,
            },
            cookieHeader
        );
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Failed to load users";
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                        Admin / Users
                    </p>
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950">
                            Users
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage user accounts, verify emails, or delete records.
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <SearchBar defaultValue={search} />
            </div>

            {errorMessage ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {errorMessage}
                </div>
            ) : users && users.data.length > 0 ? (
                <>
                    <UserTable users={users.data} />
                    <UserPagination
                        currentPage={users.page}
                        totalPages={users.totalPages}
                        search={search}
                        limit={users.limit}
                    />
                </>
            ) : (
                <EmptyState
                    title="No users found"
                    description="No user matches the current criteria."
                />
            )}
        </div>
    );
}
