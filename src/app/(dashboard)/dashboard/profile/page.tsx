"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { uploadUserImage } from "@/lib/users";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaSpinner } from "react-icons/fa";

const ProfilePage = () => {
    const { data, isPending, refetch } = useSession();
    const [name, setName] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (data?.user) {
            setName(data.user.name);
            setImage(data.user.image ?? null);
        }
    }, [data?.user]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        try {
            setIsUploadingImage(true);
            const secureUrl = await uploadUserImage(file);
            setImage(secureUrl);
            toast.success("Photo uploaded. Save changes to apply it.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Photo upload failed");
        } finally {
            setIsUploadingImage(false);
            e.target.value = "";
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim().length === 0) {
            toast.error("Name cannot be empty");
            return;
        }

        try {
            setIsSaving(true);
            await authClient.updateUser({
                name: name.trim(),
                image,
            });
            await refetch();
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center py-24 text-slate-500">
                <FaSpinner className="animate-spin text-2xl" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">My Profile</h2>
                <p className="mt-2 text-sm text-slate-500">
                    Update your display name and profile photo.
                </p>

                <form onSubmit={handleSave} className="mt-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-300 bg-slate-50">
                            {image ? (
                                <img src={image} alt={name} className="h-full w-full object-cover" />
                            ) : (
                                <FaCamera className="text-xl text-slate-400" />
                            )}
                        </div>

                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                            {isUploadingImage ? <FaSpinner className="animate-spin" /> : <FaCamera />}
                            {isUploadingImage ? "Uploading..." : "Change Photo"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data?.user.email ?? ""}
                            disabled
                            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                        />
                        <p className="mt-1 text-xs text-slate-400">Email cannot be changed.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving || isUploadingImage}
                        className="w-full rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ProfilePage;
