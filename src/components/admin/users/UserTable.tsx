"use client";

import { AppUser, deleteUser, updateUserRole } from "@/lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import UserRow from "./UserRow";
import DeleteModal from "./DeleteModal";

interface Props {
    users: AppUser[];
}

const UserTable = ({ users }: Props) => {
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);

    const handleToggleRole = async (user: AppUser) => {
        const nextRole = user.role === "admin" ? "user" : "admin";

        try {
            setUpdatingRoleId(user._id);
            await updateUserRole(user._id, nextRole);
            toast.success(
                nextRole === "admin"
                    ? `${user.name} is now an admin`
                    : `${user.name} is no longer an admin`
            );
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update role");
        } finally {
            setUpdatingRoleId(null);
        }
    };

    const handleDeleteRequest = (user: AppUser) => {
        setSelectedUser(user);
    };

    const handleDeleteClose = () => {
        if (isDeleting) {
            return;
        }
        setSelectedUser(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedUser) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteUser(selectedUser._id);
            toast.success("User deleted successfully");
            setSelectedUser(null);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete user");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Avatar</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Joined</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <UserRow
                                    key={user._id}
                                    user={user}
                                    onDelete={() => handleDeleteRequest(user)}
                                    onToggleRole={() => handleToggleRole(user)}
                                    isUpdatingRole={updatingRoleId === user._id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={selectedUser !== null}
                title={selectedUser?.name ?? ""}
                description={`Are you sure you want to delete ${selectedUser?.name ?? "this user"}? This action cannot be undone.`}
                isLoading={isDeleting}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default UserTable;
