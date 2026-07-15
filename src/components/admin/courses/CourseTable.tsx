"use client";

import { deleteCourse } from "@/lib/courses";
import { AdminCourse } from "@/types/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import CourseRow from "./CourseRow";
import DeleteModal from "./DeleteModal";
import EmptyState from "./EmptyState";

interface CourseTableProps {
    courses: AdminCourse[];
}

const CourseTable = ({ courses }: CourseTableProps) => {
    const router = useRouter();
    const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRequest = (course: AdminCourse) => {
        setSelectedCourse(course);
    };

    const handleDeleteClose = () => {
        if (isDeleting) {
            return;
        }

        setSelectedCourse(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedCourse) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteCourse(selectedCourse._id);
            toast.success("Course deleted successfully");
            setSelectedCourse(null);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete course");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!courses.length) {
        return <EmptyState title="No courses found" description="Create the first course or change the filters." />;
    }

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Thumbnail</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Course</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Slug</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Level</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Price</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {courses.map((course) => (
                                <CourseRow
                                    key={course._id}
                                    course={course}
                                    onDelete={() => handleDeleteRequest(course)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={selectedCourse !== null}
                title={selectedCourse?.title ?? "Delete course"}
                description={`This will permanently remove ${selectedCourse?.title ?? "this course"}.`}
                isLoading={isDeleting}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default CourseTable;