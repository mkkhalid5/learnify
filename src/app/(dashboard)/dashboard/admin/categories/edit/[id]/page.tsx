import CategoryForm from "@/components/admin/categories/CategoryForm";
import { fetchCategoryById } from "@/lib/categories";
import { CategoryFormValues } from "@/types/category";
import { notFound } from "next/navigation";

interface EditCategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
    const { id } = await params;
    let category: CategoryFormValues | null = null;

    try {
        const data = await fetchCategoryById(id);
        category = {
            name: data.name,
            slug: data.slug,
            image: data.image,
            description: data.description,
        };
    } catch {
        notFound();
    }

    if (!category) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Admin / Categories / Edit
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                    Edit Category
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Update the category details and image.
                </p>
            </div>

            <CategoryForm mode="edit" categoryId={id} initialValues={category} />
        </div>
    );
}