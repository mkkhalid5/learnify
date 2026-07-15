"use client";

import { AppUser } from "@/lib/users";
import { FaShieldHalved, FaTrash, FaUserMinus, FaUserShield } from "react-icons/fa6";

interface Props {
    user: AppUser;
    onDelete: () => void;
    onToggleRole: () => void;
    isUpdatingRole?: boolean;
}

const UserRow = ({ user, onDelete, onToggleRole, isUpdatingRole = false }: Props) => {
    const isAdmin = user.role === "admin";
    const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <tr className="transition hover:bg-slate-50/80">
            <td className="px-6 py-4">
                {user.image ? (
                    <img
                        src={user.image}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </td>

            <td className="px-6 py-4 font-medium text-slate-950">{user.name}</td>

            <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>

            <td className="px-6 py-4 text-sm text-slate-500">
                {user.emailVerified ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        Verified
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
                        Pending
                    </span>
                )}
            </td>

            <td className="px-6 py-4">
                {isAdmin ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-600/20">
                        <FaShieldHalved className="text-[10px]" />
                        Admin
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        Student
                    </span>
                )}
            </td>

            <td className="px-6 py-4 text-sm text-slate-600">{formattedDate}</td>

            <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={onToggleRole}
                        disabled={isUpdatingRole}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isAdmin ? <FaUserMinus className="text-xs" /> : <FaUserShield className="text-xs" />}
                        {isAdmin ? "Demote" : "Make Admin"}
                    </button>

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

export default UserRow;
