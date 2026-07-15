import CourseForm from "@/components/admin/courses/CourseForm";
import { fetchCourseById } from "@/lib/courses";
import { CourseFormValues } from "@/types/course";
import { notFound } from "next/navigation";

interface EditCoursePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
    const { id } = await params;
    let course: CourseFormValues | null = null;

    try {
        const data = await fetchCourseById(id);
        course = {
            title: data.title,
            slug: data.slug,
            thumbnail: data.thumbnail,
            shortDescription: data.shortDescription,
            description: data.description,
            category: data.category,
            instructorId: data.instructorId,
            level: data.level,
            language: data.language,
            duration: data.duration,
            price: String(data.price),
            discountPrice: data.discountPrice === null ? "" : String(data.discountPrice),
            requirements: data.requirements.length > 0 ? data.requirements : [""],
            outcomes: data.outcomes.length > 0 ? data.outcomes : [""],
            totalLessons: String(data.totalLessons),
            totalStudents: String(data.totalStudents),
            status: data.status,
        };
    } catch {
        notFound();
    }

    if (!course) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                    Admin / Courses / Edit
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                    Edit Course
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Update the course details, thumbnail, and dynamic lists.
                </p>
            </div>

            <CourseForm mode="edit" courseId={id} initialValues={course} />
        </div>
    );
}