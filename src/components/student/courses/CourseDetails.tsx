import Image from "next/image";
import { FaClock, FaLanguage, FaLayerGroup, FaListUl, FaUsers } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { AdminCourse } from "@/types/course";
import EnrollButton from "./EnrollButton";

interface CourseDetailsProps {
    course: AdminCourse;
}

const CourseDetails = ({ course }: CourseDetailsProps) => {
    return (
        <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="p-8 lg:p-10">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            <span className="rounded-full bg-slate-100 px-3 py-1">{course.category}</span>
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">{course.level}</span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">{course.status}</span>
                        </div>

                        <h1 className="mt-5 text-4xl font-semibold text-slate-950 lg:text-5xl">
                            {course.title}
                        </h1>

                        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                            {course.shortDescription}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <EnrollButton courseId={course._id} />
                            <div className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
                                ${course.price}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <InfoCard icon={FaClock} label="Duration" value={course.duration} />
                            <InfoCard icon={FaLanguage} label="Language" value={course.language} />
                            <InfoCard icon={FaLayerGroup} label="Lessons" value={course.totalLessons.toString()} />
                            <InfoCard icon={FaUsers} label="Students" value={course.totalStudents.toLocaleString()} />
                        </div>
                    </div>

                    <div className="relative min-h-[320px] lg:min-h-full">
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-slate-950">About This Course</h2>
                    <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
                        {course.description}
                    </p>
                </div>

                <div className="space-y-6">
                    <ChecklistCard title="Requirements" items={course.requirements} />
                    <ChecklistCard title="Outcomes" items={course.outcomes} />
                </div>
            </section>
        </div>
    );
};

interface InfoCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}

function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <Icon className="text-lg text-sky-600" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-slate-950">{value}</p>
        </div>
    );
}

interface ChecklistCardProps {
    title: string;
    items: string[];
}

function ChecklistCard({ title, items }: ChecklistCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
                <FaListUl className="text-sky-600" />
                <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
            </div>

            <div className="mt-4 space-y-3">
                {items.map((item) => (
                    <div key={`${title}-${item}`} className="flex items-start gap-3 text-sm text-slate-600">
                        <FaCheckCircle className="mt-0.5 text-emerald-500" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseDetails;