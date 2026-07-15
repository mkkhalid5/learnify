"use client";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50">
            <DashboardSidebar />

            <main className="flex-1">
                <DashboardTopbar />

                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}