import Image from "next/image";
import Link from "next/link";
import { AdminCourse } from "@/types/course";

interface RecentCoursesProps {
    courses: AdminCourse[];
}

const RecentCourses = ({ courses }: RecentCoursesProps) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Recent Courses
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                        Latest catalog updates
                    </h2>
                </div>

                <Link
                    href="/dashboard/admin/manage-courses"
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    View All
                </Link>
            </div>

            <div className="mt-6 space-y-4">
                {courses.map((course) => (
                    <div key={course._id} className="flex flex-col gap-4 rounded-3xl border border-slate-100 p-4 sm:flex-row sm:items-center">
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={84}
                            height={84}
                            unoptimized
                            className="h-20 w-20 rounded-2xl object-cover"
                        />

                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                    {course.category}
                                </span>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                    {course.status}
                                </span>
                            </div>

                            <h3 className="truncate text-lg font-semibold text-slate-950">
                                {course.title}
                            </h3>

                            <p className="line-clamp-2 text-sm text-slate-500">
                                {course.shortDescription}
                            </p>
                        </div>

                        <div className="grid gap-3 text-sm text-slate-600 sm:min-w-40 sm:justify-items-end">
                            <p className="font-semibold text-slate-950">${course.price}</p>
                            <p>{course.totalStudents} students</p>
                            <Link
                                href={`/dashboard/admin/manage-courses/edit/${course._id}`}
                                className="text-sky-600 transition hover:text-sky-700"
                            >
                                Edit course
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentCourses;