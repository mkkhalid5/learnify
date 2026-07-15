import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUsers } from "react-icons/fa6";

import { AdminCourse } from "@/types/course";

type CourseCardProps = {
  course: AdminCourse;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
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
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {course.category}
          </span>

          <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
            {course.level}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold text-slate-950">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {course.shortDescription}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <FaClock className="text-sky-600" />
            {course.duration}
          </span>

          <span className="inline-flex items-center gap-2">
            <FaUsers className="text-sky-600" />
            {course.totalStudents}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <h4 className="text-2xl font-semibold text-slate-950">
              ${course.price}
            </h4>

            {course.discountPrice !== null ? (
              <p className="text-xs text-slate-500 line-through">
                ${course.discountPrice}
              </p>
            ) : null}
          </div>

          <Link
            href={`/courses/${course._id}`}
            className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;