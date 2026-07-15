"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";

export default function SettingsPage() {
    const { data: session, isPending } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Password State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name);
            setEmail(session.user.email);
        }
    }, [session]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        try {
            setIsSavingProfile(true);
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message || "Failed to update profile");
                return;
            }

            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword) {
            toast.error("Current password is required");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsChangingPassword(true);
            const { error } = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            });

            if (error) {
                toast.error(error.message || "Failed to change password");
                return;
            }

            toast.success("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <FaSpinner className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Admin / Settings
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Configure your admin profile and password credentials.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Profile Settings */}
                <form
                    onSubmit={handleProfileSubmit}
                    className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2 className="text-xl font-semibold text-slate-950">Update Profile</h2>
                    
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email Address (Read-only)
                        </label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            disabled
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSavingProfile}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSavingProfile && <FaSpinner className="animate-spin" />}
                        Save Changes
                    </button>
                </form>

                {/* Password Settings */}
                <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2 className="text-xl font-semibold text-slate-950">Change Password</h2>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isChangingPassword}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isChangingPassword && <FaSpinner className="animate-spin" />}
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
