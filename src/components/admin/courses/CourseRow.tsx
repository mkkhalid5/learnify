"use client";

import { AdminCourse } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

interface CourseRowProps {
    course: AdminCourse;
    onDelete: () => void;
}

const CourseRow = ({ course, onDelete }: CourseRowProps) => {
    return (
        <tr className="transition hover:bg-slate-50/80">
            <td className="px-6 py-4">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={56}
                    height={56}
                    unoptimized
                    className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                />
            </td>

            <td className="px-6 py-4">
                <div className="space-y-1">
                    <p className="font-medium text-slate-950">{course.title}</p>
                    <p className="max-w-xs text-sm text-slate-500">{course.shortDescription}</p>
                </div>
            </td>

            <td className="px-6 py-4 text-sm text-slate-500">{course.slug}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{course.category}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{course.level}</td>
            <td className="px-6 py-4 text-sm text-slate-600">{course.status}</td>
            <td className="px-6 py-4 text-sm font-semibold text-slate-950">${course.price}</td>

            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                    <Link
                        href={`/dashboard/admin/manage-courses/edit/${course._id}`}
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

export default CourseRow;