"use client";

import { adminDashboardMenu } from "@/constants/adminDashboardMenu";
import { studentDashboardMenu } from "@/constants/studentDashboardMenu";
import { useSession } from "@/lib/auth-client";
import SidebarItem from "./SidebarItem";

const DashboardSidebar = () => {
    const { data } = useSession();
    const role = (data?.user as { role?: string } | undefined)?.role ?? "user";
    const isAdmin = role === "admin";
    const menu = isAdmin ? adminDashboardMenu : studentDashboardMenu;

    return (
        <aside className="hidden w-76 border-r border-slate-200 bg-white/95 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.02)] lg:block">
            <div className="rounded-3xl bg-slate-950 px-5 py-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                    {isAdmin ? "Learnify Admin" : "Learnify"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                    Dashboard
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                    {isAdmin
                        ? "Monitor courses, categories, and growth from one place."
                        : "Track your learning journey and profile."}
                </p>
            </div>

            <div className="mt-6 space-y-2">
                {menu.map((item) => (
                    <SidebarItem
                        key={item.href}
                        {...item}
                    />
                ))}
            </div>
        </aside>
    );
};

export default DashboardSidebar;