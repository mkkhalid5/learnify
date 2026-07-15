import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function CreateCategoryPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Admin / Categories / Create
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                    Create Category
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Add a new category with an image, slug, and description.
                </p>
            </div>

            <CategoryForm mode="create" />
        </div>
    );
}