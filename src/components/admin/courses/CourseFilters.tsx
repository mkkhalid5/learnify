"use client";

import { Category } from "@/types/category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CourseFiltersProps {
    categories: Category[];
    currentCategory: string;
    currentLevel: string;
    currentStatus: string;
    currentSort: string;
}

const levelOptions = ["", "Beginner", "Intermediate", "Advanced"];
const statusOptions = ["", "draft", "published", "archived"];
const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "students_desc", label: "Students: High to Low" },
    { value: "students_asc", label: "Students: Low to High" },
];

const CourseFilters = ({
    categories,
    currentCategory,
    currentLevel,
    currentStatus,
    currentSort,
}: CourseFiltersProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParams = (nextValues: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(nextValues).forEach(([key, value]) => {
            if (value.length > 0) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        params.set("page", "1");
        router.push(`${pathname}${params.toString().length > 0 ? `?${params.toString()}` : ""}`);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-4">
            <select
                value={currentCategory}
                onChange={(event) => updateParams({ category: event.target.value })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category._id} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select
                value={currentLevel}
                onChange={(event) => updateParams({ level: event.target.value })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
            >
                <option value="">All Levels</option>
                {levelOptions.slice(1).map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>

            <select
                value={currentStatus}
                onChange={(event) => updateParams({ status: event.target.value })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
            >
                <option value="">All Status</option>
                {statusOptions.slice(1).map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>

            <select
                value={currentSort}
                onChange={(event) => updateParams({ sort: event.target.value })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CourseFilters;