"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

interface CourseSearchBarProps {
    defaultValue?: string;
}

const SearchBar = ({ defaultValue = "" }: CourseSearchBarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(defaultValue);

    useEffect(() => {
        setQuery(defaultValue);
    }, [defaultValue]);

    const updateSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim().length > 0) {
            params.set("search", value.trim());
        } else {
            params.delete("search");
        }

        params.set("page", "1");
        router.push(`${pathname}${params.toString().length > 0 ? `?${params.toString()}` : ""}`);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        updateSearch("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search courses by title, description, or slug"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                />
                {query ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                        <FaXmark />
                    </button>
                ) : null}
            </div>

            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;