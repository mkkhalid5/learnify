"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBookOpen, FaCalendarAlt, FaSpinner } from "react-icons/fa";

import { fetchMyEnrollments } from "@/lib/enrollments";
import { Enrollment } from "@/types/enrollment";

const MyCoursesPage = () => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;

        fetchMyEnrollments({ limit: 50 })
            .then((result) => {
                if (active) {
                    setEnrollments(result.data);
                }
            })
            .catch((error) => {
                if (active) {
                    setErrorMessage(
                        error instanceof Error ? error.message : "Failed to load your courses"
                    );
                }
            })
            .finally(() => {
                if (active) {
                    setIsLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                    My Courses
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                    Your booked courses
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    Everything you have enrolled in lives here, along with booking details for each course.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-14 text-slate-500 shadow-sm">
                    <FaSpinner className="animate-spin" />
                    Loading your courses...
                </div>
            ) : errorMessage ? (
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    {errorMessage}
                </div>
            ) : enrollments.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                    <FaBookOpen className="mx-auto text-3xl text-slate-300" />
                    <h3 className="mt-4 text-xl font-semibold text-slate-950">
                        You haven&apos;t booked any courses yet
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                        Browse the catalog and enroll in a course to see it here.
                    </p>
                    <Link
                        href="/courses"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Browse Courses
                        <FaArrowRight />
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {enrollments.map((enrollment) => (
                        <div
                            key={enrollment._id}
                            className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                {enrollment.courseThumbnail ? (
                                    <img
                                        src={enrollment.courseThumbnail}
                                        alt={enrollment.courseTitle}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                                        <FaBookOpen className="text-3xl" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <h3 className="line-clamp-2 text-lg font-semibold text-slate-950">
                                    {enrollment.courseTitle}
                                </h3>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                                        Enrolled
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-slate-400" />
                                        Booked{" "}
                                        {new Date(enrollment.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <Link
                                    href={`/courses/${enrollment.courseId}`}
                                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    View Booked Details
                                    <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCoursesPage;
