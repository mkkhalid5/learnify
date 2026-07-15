import { headers } from "next/headers";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import RecentCourses from "@/components/dashboard/RecentCourses";
import { fetchDashboardSummary } from "@/lib/dashboard";
import { DashboardSummary } from "@/types/dashboard";
import { FaBook, FaDollarSign, FaFolderOpen, FaUsers } from "react-icons/fa6";

const EMPTY_SUMMARY: DashboardSummary = {
    totalCategories: 0,
    totalCourses: 0,
    totalStudents: 0,
    revenue: 0,
    recentCourses: [],
};

const AdminOverview = async () => {
    let summary: DashboardSummary = EMPTY_SUMMARY;

    try {
        const cookieHeader = (await headers()).get("cookie");
        summary = await fetchDashboardSummary(cookieHeader);
    } catch {
        // Backend may not be available; render with zeroed stats
    }

    return (
        <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                    Admin Dashboard
                </p>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl space-y-3">
                        <h2 className="text-4xl font-semibold">
                            Welcome back. Here is the Learnify snapshot.
                        </h2>
                        <p className="text-sm leading-6 text-slate-300">
                            Track catalog growth, student activity, and recent course updates from one overview.
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="Total Categories"
                    value={summary.totalCategories.toString()}
                    description="Active categories in the catalog"
                    icon={FaFolderOpen}
                />
                <DashboardStatCard
                    title="Total Courses"
                    value={summary.totalCourses.toString()}
                    description="Courses available in the system"
                    icon={FaBook}
                />
                <DashboardStatCard
                    title="Total Students"
                    value={summary.totalStudents.toLocaleString()}
                    description="Students represented in course totals"
                    icon={FaUsers}
                />
                <DashboardStatCard
                    title="Revenue"
                    value={`$${summary.revenue.toLocaleString()}`}
                    description="Estimated catalog revenue"
                    icon={FaDollarSign}
                />
            </section>

            <RecentCourses courses={summary.recentCourses} />
        </div>
    );
};

export default AdminOverview;
