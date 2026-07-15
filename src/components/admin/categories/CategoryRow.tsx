"use client";

import { Category } from "@/types/category";
import Link from "next/link";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

interface Props {
    category: Category;
    onDelete: () => void;
}

const CategoryRow = ({ category, onDelete }: Props) => {
    return (
        <tr className="transition hover:bg-slate-50/80">
            <td className="px-6 py-4">
                <img
                    src={category.image}
                    alt={category.name}
                    className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                />
            </td>

            <td className="px-6 py-4 font-medium text-slate-950">{category.name}</td>

            <td className="px-6 py-4 text-sm text-slate-500">{category.slug}</td>

            <td className="px-6 py-4 max-w-xs text-sm text-slate-600">
                {category.description}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                    <Link
                        href={`/dashboard/admin/categories/edit/${category._id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                    >
                        <FaPenToSquare className="text-xs" />
                        Edit
                    </Link>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                    >
                        <FaTrash className="text-xs" />
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default CategoryRow;