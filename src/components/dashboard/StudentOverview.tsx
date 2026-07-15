import { headers } from "next/headers";
import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaGraduationCap } from "react-icons/fa6";
import CourseCard from "@/components/student/courses/CourseCard";
import { fetchCourses } from "@/lib/courses";
import { fetchMyEnrollments } from "@/lib/enrollments";
import { AdminCourse } from "@/types/course";

interface StudentOverviewProps {
    name: string;
    email: string;
    image: string | null;
    joinedAt: string;
}

const StudentOverview = async ({ name, email, image, joinedAt }: StudentOverviewProps) => {
    let recommendedCourses: AdminCourse[] = [];
    let enrolledCount = 0;

    try {
        const result = await fetchCourses({ status: "published", sort: "newest", limit: 3 });
        recommendedCourses = result.data;
    } catch {
        // Backend may not be available; render without recommendations
    }

    try {
        const cookieHeader = (await headers()).get("cookie");
        const enrollments = await fetchMyEnrollments({ limit: 1 }, cookieHeader);
        enrolledCount = enrollments.total;
    } catch {
        // Backend may not be available; render without the enrollment count
    }

    const formattedJoinDate = new Date(joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                    Student Dashboard
                </p>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl space-y-3">
                        <h2 className="text-4xl font-semibold">
                            Welcome back, {name.split(" ")[0]}.
                        </h2>
                        <p className="text-sm leading-6 text-slate-300">
                            Pick up where you left off, or explore new courses to keep growing your skills.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                        Browse Courses
                        <FaArrowRight />
                    </Link>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Booked Courses
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                            {enrolledCount > 0
                                ? `You are enrolled in ${enrolledCount} course${enrolledCount === 1 ? "" : "s"}`
                                : "You haven't booked a course yet"}
                        </h2>
                    </div>

                    <Link
                        href="/dashboard/my-courses"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        View My Courses
                        <FaArrowRight className="text-xs" />
                    </Link>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="h-16 w-16 rounded-full border border-slate-200 object-cover"
                            />
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-xl font-semibold text-white">
                                {name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div>
                            <h3 className="text-xl font-semibold text-slate-950">{name}</h3>
                            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                <FaEnvelope className="text-slate-400" />
                                {email}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                <FaGraduationCap className="text-slate-400" />
                                Student since {formattedJoinDate}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/profile"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Edit Profile
                    </Link>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Recommended For You
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                            Continue learning
                        </h2>
                    </div>

                    <Link
                        href="/courses"
                        className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        View All
                    </Link>
                </div>

                {recommendedCourses.length > 0 ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {recommendedCourses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-sm text-slate-500">
                        No courses are available yet. Check back soon.
                    </p>
                )}
            </section>
        </div>
    );
};

export default StudentOverview;
