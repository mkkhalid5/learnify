import { headers } from "next/headers";

import EmptyState from "@/components/admin/messages/EmptyState";
import MessagePagination from "@/components/admin/messages/MessagePagination";
import MessageTable from "@/components/admin/messages/MessageTable";
import SearchBar from "@/components/admin/messages/SearchBar";
import { fetchMessages } from "@/lib/messages";
import { PaginationResponse } from "@/types/api";
import { ContactMessage } from "@/types/message";

interface MessagesPageProps {
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

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
    const resolvedSearchParams = (await searchParams) ?? {};
    const search = readParam(resolvedSearchParams.search).trim();
    const page = readNumberParam(resolvedSearchParams.page, 1);
    const limit = readNumberParam(resolvedSearchParams.limit, 10);

    let messages: PaginationResponse<ContactMessage> | null = null;
    let errorMessage = "";

    try {
        const cookieHeader = (await headers()).get("cookie");
        messages = await fetchMessages(
            {
                search: search.length > 0 ? search : undefined,
                page,
                limit,
            },
            cookieHeader
        );
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Failed to load messages";
    }

    const newCount = messages?.data.filter((message) => message.status === "new").length ?? 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                        Admin / Messages
                    </p>
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-950">
                            Contact Messages
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {newCount > 0
                                ? `${newCount} unread message${newCount === 1 ? "" : "s"} on this page.`
                                : "Messages submitted through the contact form."}
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
            ) : messages && messages.data.length > 0 ? (
                <>
                    <MessageTable messages={messages.data} />
                    <MessagePagination
                        currentPage={messages.page}
                        totalPages={messages.totalPages}
                        search={search}
                        limit={messages.limit}
                    />
                </>
            ) : (
                <EmptyState
                    title="No messages found"
                    description="No message matches the current criteria."
                />
            )}
        </div>
    );
}
