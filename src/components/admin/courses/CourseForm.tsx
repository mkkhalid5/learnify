"use client";

import { fetchCategories } from "@/lib/categories";
import { createCourse, fetchCourseById, toSlug, updateCourse, uploadCourseThumbnail } from "@/lib/courses";
import { Category } from "@/types/category";
import { CourseFormValues } from "@/types/course";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaCirclePlus, FaSpinner, FaTrash } from "react-icons/fa6";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface CourseFormProps {
    mode: "create" | "edit";
    courseId?: string;
    initialValues?: CourseFormValues;
}

interface FieldErrors {
    title: string;
    thumbnail: string;
    shortDescription: string;
    description: string;
    category: string;
    instructorId: string;
    level: string;
    language: string;
    duration: string;
    price: string;
    totalLessons: string;
    status: string;
}

const emptyValues: CourseFormValues = {
    title: "",
    slug: "",
    thumbnail: "",
    shortDescription: "",
    description: "",
    category: "",
    instructorId: "",
    level: "Beginner",
    language: "English",
    duration: "0h",
    price: "",
    discountPrice: "",
    requirements: [""],
    outcomes: [""],
    totalLessons: "0",
    totalStudents: "0",
    status: "draft",
};

const emptyErrors: FieldErrors = {
    title: "",
    thumbnail: "",
    shortDescription: "",
    description: "",
    category: "",
    instructorId: "",
    level: "",
    language: "",
    duration: "",
    price: "",
    totalLessons: "",
    status: "",
};

const CourseForm = ({ mode, courseId, initialValues }: CourseFormProps) => {
    const router = useRouter();
    const [formValues, setFormValues] = useState<CourseFormValues>(initialValues ?? emptyValues);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>(emptyErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        if (initialValues) {
            setFormValues(initialValues);
        }
    }, [initialValues]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories({ limit: 100 });
                setCategories(response.data);

                if (!formValues.category && response.data.length > 0) {
                    setFormValues((previous) => ({
                        ...previous,
                        category: response.data[0].slug,
                    }));
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to load categories");
            } finally {
                setIsLoadingCategories(false);
            }
        };

        void loadCategories();
    }, []);

    const validate = (): boolean => {
        const nextErrors: FieldErrors = { ...emptyErrors };

        if (!formValues.title.trim()) {
            nextErrors.title = "Course title is required";
        }

        if (!formValues.thumbnail.trim()) {
            nextErrors.thumbnail = "Course thumbnail is required";
        }

        if (!formValues.shortDescription.trim()) {
            nextErrors.shortDescription = "Short description is required";
        }

        if (!formValues.description.trim()) {
            nextErrors.description = "Course description is required";
        }

        if (!formValues.category.trim()) {
            nextErrors.category = "Category is required";
        }

        if (!formValues.instructorId.trim()) {
            nextErrors.instructorId = "Instructor ID is required";
        }

        if (!formValues.level.trim()) {
            nextErrors.level = "Level is required";
        }

        if (!formValues.language.trim()) {
            nextErrors.language = "Language is required";
        }

        if (!formValues.duration.trim()) {
            nextErrors.duration = "Duration is required";
        }

        if (!formValues.price.trim()) {
            nextErrors.price = "Price is required";
        }

        if (!formValues.totalLessons.trim()) {
            nextErrors.totalLessons = "Total lessons is required";
        }

        if (!formValues.status.trim()) {
            nextErrors.status = "Status is required";
        }

        setFieldErrors(nextErrors);
        return !Object.values(nextErrors).some((value) => value.length > 0);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        if (name === "title") {
            setFormValues((previous) => ({
                ...previous,
                title: value,
                slug: toSlug(value),
            }));
            return;
        }

        setFormValues((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
            const secureUrl = await uploadCourseThumbnail(file);
            setFormValues((previous) => ({
                ...previous,
                thumbnail: secureUrl,
            }));
            setFieldErrors((previous) => ({
                ...previous,
                thumbnail: "",
            }));
            toast.success("Thumbnail uploaded successfully");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Thumbnail upload failed");
        } finally {
            setIsUploading(false);
            event.target.value = "";
        }
    };

    const updateArrayField = (field: "requirements" | "outcomes", index: number, value: string) => {
        setFormValues((previous) => {
            const nextValues = [...previous[field]];
            nextValues[index] = value;

            return {
                ...previous,
                [field]: nextValues,
            };
        });
    };

    const addArrayField = (field: "requirements" | "outcomes") => {
        setFormValues((previous) => ({
            ...previous,
            [field]: [...previous[field], ""],
        }));
    };

    const removeArrayField = (field: "requirements" | "outcomes", index: number) => {
        setFormValues((previous) => ({
            ...previous,
            [field]: previous[field].filter((_, itemIndex) => itemIndex !== index),
        }));
    };

    const normalizeArray = (items: string[]): string[] => items.map((item) => item.trim()).filter((item) => item.length > 0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: CourseFormValues = {
                ...formValues,
                title: formValues.title.trim(),
                slug: formValues.slug.trim() || toSlug(formValues.title),
                thumbnail: formValues.thumbnail.trim(),
                shortDescription: formValues.shortDescription.trim(),
                description: formValues.description.trim(),
                category: formValues.category.trim(),
                instructorId: formValues.instructorId.trim(),
                level: formValues.level.trim(),
                language: formValues.language.trim(),
                duration: formValues.duration.trim(),
                price: formValues.price.trim(),
                discountPrice: formValues.discountPrice.trim(),
                requirements: normalizeArray(formValues.requirements),
                outcomes: normalizeArray(formValues.outcomes),
                totalLessons: formValues.totalLessons.trim(),
                totalStudents: formValues.totalStudents.trim(),
                status: formValues.status.trim(),
            };

            if (mode === "create") {
                await createCourse(payload);
                toast.success("Course created successfully");
            } else {
                if (!courseId) {
                    throw new Error("Course id is required for updates");
                }

                await updateCourse(courseId, payload);
                toast.success("Course updated successfully");
            }

            router.push("/dashboard/admin/manage-courses");
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
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                            <input
                                name="title"
                                value={formValues.title}
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Complete React Masterclass"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                            {fieldErrors.title ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.title}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Auto Slug</label>
                            <input
                                value={formValues.slug}
                                readOnly
                                type="text"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Short Description</label>
                        <textarea
                            name="shortDescription"
                            value={formValues.shortDescription}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder="Short summary used in cards and lists"
                        />
                        {fieldErrors.shortDescription ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.shortDescription}</p> : null}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                        <RichTextEditor
                            value={formValues.description}
                            onChange={(val) => setFormValues(previous => ({ ...previous, description: val }))}
                            placeholder="Full course description"
                            error={fieldErrors.description}
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Instructor ID</label>
                            <input
                                name="instructorId"
                                value={formValues.instructorId}
                                onChange={handleChange}
                                type="text"
                                placeholder="MongoDB user id"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                            {fieldErrors.instructorId ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.instructorId}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                            <select
                                name="category"
                                value={formValues.category}
                                onChange={handleChange}
                                disabled={isLoadingCategories}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                            >
                                {categories.length === 0 ? <option value="">No categories available</option> : null}
                                {categories.map((category) => (
                                    <option key={category._id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {fieldErrors.category ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.category}</p> : null}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Level</label>
                            <select
                                name="level"
                                value={formValues.level}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            {fieldErrors.level ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.level}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Language</label>
                            <input
                                name="language"
                                value={formValues.language}
                                onChange={handleChange}
                                type="text"
                                placeholder="English"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                            {fieldErrors.language ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.language}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Duration</label>
                            <input
                                name="duration"
                                value={formValues.duration}
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. 12h 30m"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                            {fieldErrors.duration ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.duration}</p> : null}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
                            <input
                                name="price"
                                value={formValues.price}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="49"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                            {fieldErrors.price ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.price}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Discount Price</label>
                            <input
                                name="discountPrice"
                                value={formValues.discountPrice}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="39"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                            <select
                                name="status"
                                value={formValues.status}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
                            >
                                <option value="draft">draft</option>
                                <option value="published">published</option>
                                <option value="archived">archived</option>
                            </select>
                            {fieldErrors.status ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.status}</p> : null}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Total Lessons</label>
                            <input
                                name="totalLessons"
                                value={formValues.totalLessons}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
                            />
                            {fieldErrors.totalLessons ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.totalLessons}</p> : null}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Total Students</label>
                            <input
                                name="totalStudents"
                                value={formValues.totalStudents}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-500"
                            />
                        </div>
                    </div>

                    <ArrayEditor
                        title="Requirements"
                        items={formValues.requirements}
                        onAdd={() => addArrayField("requirements")}
                        onChange={(index, value) => updateArrayField("requirements", index, value)}
                        onRemove={(index) => removeArrayField("requirements", index)}
                    />

                    <ArrayEditor
                        title="Outcomes"
                        items={formValues.outcomes}
                        onAdd={() => addArrayField("outcomes")}
                        onChange={(index, value) => updateArrayField("outcomes", index, value)}
                        onRemove={(index) => removeArrayField("outcomes", index)}
                    />
                </div>

                <div className="space-y-5 rounded-3xl bg-slate-50 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Thumbnail</label>

                        <div className="flex flex-col gap-4">
                            <div className="overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white p-4">
                                {formValues.thumbnail ? (
                                    <Image
                                        src={formValues.thumbnail}
                                        alt={formValues.title || "Course preview"}
                                        width={640}
                                        height={320}
                                        unoptimized
                                        className="h-48 w-full rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                                        <FaCamera className="text-2xl" />
                                        <p className="mt-3 text-sm">Upload a course thumbnail</p>
                                    </div>
                                )}
                            </div>

                            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                                {isUploading ? <FaSpinner className="animate-spin" /> : <FaCamera />}
                                {isUploading ? "Uploading..." : formValues.thumbnail ? "Replace Thumbnail" : "Upload Thumbnail"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {fieldErrors.thumbnail ? <p className="mt-2 text-sm text-rose-600">{fieldErrors.thumbnail}</p> : null}
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-950">Preview Notes</p>
                        <ul className="mt-3 space-y-2">
                            <li>• Slug updates automatically from the title.</li>
                            <li>• The image is uploaded to Cloudinary immediately.</li>
                            <li>• Requirements and outcomes accept dynamic entries.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/admin/manage-courses")}
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
                    {isSubmitting ? "Saving..." : mode === "create" ? "Create Course" : "Update Course"}
                </button>
            </div>
        </form>
    );
};

interface ArrayEditorProps {
    title: string;
    items: string[];
    onAdd: () => void;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
}

function ArrayEditor({ title, items, onAdd, onChange, onRemove }: ArrayEditorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {title}
                </h3>

                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    <FaCirclePlus className="text-xs" />
                    Add Item
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={`${title}-${index}`} className="flex gap-3">
                        <input
                            type="text"
                            value={item}
                            onChange={(event) => onChange(index, event.target.value)}
                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500"
                            placeholder={`${title} ${index + 1}`}
                        />

                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 transition hover:bg-rose-100"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseForm;