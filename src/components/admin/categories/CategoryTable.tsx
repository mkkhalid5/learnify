"use client";

import { deleteCategory } from "@/lib/categories";
import { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CategoryRow from "./CategoryRow";
import DeleteModal from "./DeleteModal";
import EmptyState from "./EmptyState";

interface Props {
    categories: Category[];
}

const CategoryTable = ({ categories }: Props) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRequest = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleDeleteClose = () => {
        if (isDeleting) {
            return;
        }

        setSelectedCategory(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedCategory) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteCategory(selectedCategory._id);
            toast.success("Category deleted successfully");
            setSelectedCategory(null);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete category");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!categories.length) {
        return <EmptyState title="No categories found" description="Try another search or create a new category." />;
    }

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Image</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Slug</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Description</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {categories.map((category) => (
                                <CategoryRow
                                    key={category._id}
                                    category={category}
                                    onDelete={() => handleDeleteRequest(category)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={selectedCategory !== null}
                title={selectedCategory?.name ?? "Delete category"}
                description={`This will permanently remove ${selectedCategory?.name ?? "this category"}.`}
                isLoading={isDeleting}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default CategoryTable;