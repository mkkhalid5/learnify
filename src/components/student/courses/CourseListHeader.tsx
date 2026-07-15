interface CourseListHeaderProps {
    total: number;
}

const CourseListHeader = ({ total }: CourseListHeaderProps) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Learnify Courses
            </p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-4xl font-semibold">Explore courses that move your career forward.</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                        Search the full catalog, filter by category or level, and open detailed course pages before enrolling.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Published Courses</p>
                    <p className="mt-2 text-3xl font-semibold">{total}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseListHeader;