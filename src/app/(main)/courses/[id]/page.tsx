import CourseDetails from "@/components/student/courses/CourseDetails";
import { fetchCourseById } from "@/lib/courses";
import { AdminCourse } from "@/types/course";
import { notFound } from "next/navigation";

interface CourseDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
    const { id } = await params;
    let course: AdminCourse | null = null;

    try {
        course = await fetchCourseById(id);
    } catch {
        notFound();
    }

    if (!course) {
        notFound();
    }

    return (
        <div className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <CourseDetails course={course} />
            </div>
        </div>
    );
}