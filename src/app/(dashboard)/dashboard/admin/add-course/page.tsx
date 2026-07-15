import CourseForm from "@/components/admin/courses/CourseForm";

export default function AddCoursePage() {
	return (
		<div className="space-y-6">
			<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
					Admin / Courses / Add
				</p>
				<h1 className="mt-2 text-3xl font-semibold text-slate-950">
					Add Course
				</h1>
				<p className="mt-2 text-sm text-slate-500">
					Create a new course with Cloudinary thumbnail upload and dynamic fields.
				</p>
			</div>

			<CourseForm mode="create" />
		</div>
	);
}
