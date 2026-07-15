"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const DashboardTopbar = () => {
    const router = useRouter();
    const { data } = useSession();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/login");
                    router.refresh();
                },
            },
        });
    };

    const role = (data?.user as { role?: string } | undefined)?.role ?? "user";
    const isAdmin = role === "admin";
    const userImage = (data?.user as { image?: string | null } | undefined)?.image;

    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl lg:px-8">
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    {isAdmin ? "Admin Workspace" : "Student Workspace"}
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-950">
                    {isAdmin ? "Dashboard Overview" : "My Dashboard"}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    <FaArrowRightFromBracket />
                    Logout
                </button>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                    {userImage ? (
                        <img
                            src={userImage}
                            alt={data?.user.name ?? "User"}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
                            {data?.user.name.charAt(0)}
                        </div>
                    )}

                    <div>
                        <p className="text-sm font-semibold text-slate-950">
                            {data?.user.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {data?.user.email}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default DashboardTopbar;