import Link from "next/link";

interface UserPaginationProps {
    currentPage: number;
    totalPages: number;
    search?: string;
    limit: number;
}

function buildPageHref(page: number, search: string | undefined, limit: number): string {
    const params = new URLSearchParams();

    if (search && search.length > 0) {
        params.set("search", search);
    }

    params.set("page", String(page));
    params.set("limit", String(limit));

    return `/dashboard/admin/users?${params.toString()}`;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
    const pages: number[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let page = start; page <= end; page += 1) {
        pages.push(page);
    }

    if (!pages.includes(1)) {
        pages.unshift(1);
    }

    if (!pages.includes(totalPages)) {
        pages.push(totalPages);
    }

    return Array.from(new Set(pages)).sort((left, right) => left - right);
}

const UserPagination = ({ currentPage, totalPages, search, limit }: UserPaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href={buildPageHref(Math.max(1, currentPage - 1), search, limit)}
                    aria-disabled={currentPage <= 1}
                    className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                        currentPage <= 1
                            ? "pointer-events-none border-slate-200 text-slate-300"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    Previous
                </Link>

                {pages.map((page) => (
                    <Link
                        key={page}
                        href={buildPageHref(page, search, limit)}
                        className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                            page === currentPage
                                ? "bg-slate-950 text-white"
                                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                        {page}
                    </Link>
                ))}

                <Link
                    href={buildPageHref(Math.min(totalPages, currentPage + 1), search, limit)}
                    aria-disabled={currentPage >= totalPages}
                    className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                        currentPage >= totalPages
                            ? "pointer-events-none border-slate-200 text-slate-300"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    Next
                </Link>
            </div>
        </div>
    );
};

export default UserPagination;
