import Image from "next/image";
import Link from "next/link";
import { FaStar, FaUsers } from "react-icons/fa6";
import { AdminCourse } from "@/types/course";

interface CourseCardProps {
    course: AdminCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/courses/${course._id}`} className="block">
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="space-y-4 p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{course.category}</span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">{course.level}</span>
                </div>

                <div className="space-y-2">
                    <h3 className="line-clamp-2 text-xl font-semibold text-slate-950">
                        {course.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                        {course.shortDescription}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Instructor {course.instructorId.slice(0, 8)}</span>
                    <span>{course.duration}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <p className="text-2xl font-semibold text-slate-950">${course.price}</p>
                        {course.discountPrice !== null ? (
                            <p className="text-xs text-slate-500 line-through">${course.discountPrice}</p>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1">
                            <FaUsers className="text-sky-600" />
                            {course.totalStudents}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <FaStar className="text-amber-500" />
                            4.9
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;