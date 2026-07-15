"use client";

import { createCategory, toSlug, updateCategory, uploadCategoryImage } from "@/lib/categories";
import { CategoryFormValues } from "@/types/category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaSpinner } from "react-icons/fa6";

interface CategoryFormProps {
    mode: "create" | "edit";
    initialValues?: CategoryFormValues;
    categoryId?: string;
}

interface FieldErrors {
    name: string;
    image: string;
    description: string;
}

const emptyValues: CategoryFormValues = {
    name: "",
    slug: "",
    image: "",
    description: "",
};

const emptyErrors: FieldErrors = {
    name: "",
    image: "",
    description: "",
};

const CategoryForm = ({ mode, initialValues, categoryId }: CategoryFormProps) => {
    const router = useRouter();
    const [formValues, setFormValues] = useState<CategoryFormValues>(initialValues ?? emptyValues);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>(emptyErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialValues) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    const validate = (): boolean => {
        const nextErrors: FieldErrors = {
            name: "",
            image: "",
            description: "",
        };

        if (!formValues.name.trim()) {
            nextErrors.name = "Category name is required";
        }

        if (!formValues.image.trim()) {
            nextErrors.image = "Category image is required";
        }

        if (!formValues.description.trim()) {
            nextErrors.description = "Category description is required";
        }

        setFieldErrors(nextErrors);
        return !Object.values(nextErrors).some((value) => value.length > 0);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        if (name === "name") {
            setFormValues((previous) => ({
                ...previous,
                name: value,
                slug: toSlug(value),
            }));
            return;
        }

        setFormValues((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        try {
            setIsUploading(true);
            const secureUrl = await uploadCategoryImage(file);
            setFormValues((previous) => ({
                ...previous,
                image: secureUrl,
            }));
            setFieldErrors((previous) => ({
                ...previous,
                image: "",
            }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Image upload failed");
        } finally {
            setIsUploading(false);
            event.target.value = "";
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setIsSubmitting(true);
            const payload: CategoryFormValues = {
                name: formValues.name.trim(),
                slug: formValues.slug.trim() || toSlug(formValues.name),
                image: formValues.image.trim(),
                description: formValues.description.trim(),
            };

            if (mode === "create") {
                await createCategory(payload);
                toast.success("Category created successfully");
            } else {
                if (!categoryId) {
                    throw new Error("Category id is required for updates");
                }

                await updateCategory(categoryId, payload);
                toast.success("Category updated successfully");
            }

            router.push("/dashboard/admin/categories");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Category Name
                        </label>
                        <input
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="e.g. Web Development"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                        />
                        {fieldErrors.name ? (
                            <p className="mt-2 text-sm text-rose-600">{fieldErrors.name}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Auto Slug
                        </label>
                        <input
                            value={formValues.slug}
                            readOnly
                            type="text"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
                        />
                        <p className="mt-2 text-xs text-slate-500">The slug updates automatically from the category name.</p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Short, useful description for the category"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                        />
                        {fieldErrors.description ? (
                            <p className="mt-2 text-sm text-rose-600">{fieldErrors.description}</p>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-5 rounded-3xl bg-slate-50 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Category Image
                        </label>

                        <div className="flex flex-col gap-4">
                            <div className="overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white p-4">
                                {formValues.image ? (
                                    <img
                                        src={formValues.image}
                                        alt={formValues.name || "Category preview"}
                                        className="h-48 w-full rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                                        <FaCamera className="text-2xl" />
                                        <p className="mt-3 text-sm">Upload a category image</p>
                                    </div>
                                )}
                            </div>

                            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                {isUploading ? <FaSpinner className="animate-spin" /> : <FaCamera />}
                                {isUploading ? "Uploading..." : formValues.image ? "Replace Image" : "Upload Image"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {fieldErrors.image ? (
                            <p className="mt-2 text-sm text-rose-600">{fieldErrors.image}</p>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/admin/categories")}
                    className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : null}
                    {isSubmitting ? "Saving..." : mode === "create" ? "Create Category" : "Update Category"}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;