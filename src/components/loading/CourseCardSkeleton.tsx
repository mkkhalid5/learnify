const CourseCardSkeleton = () => {
	return (
		<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
			<div className="h-56 animate-pulse bg-slate-200/80" />
			<div className="space-y-4 p-6">
				<div className="h-6 w-24 animate-pulse rounded-full bg-slate-200/80" />
				<div className="h-6 w-full animate-pulse rounded-full bg-slate-200/80" />
				<div className="h-6 w-4/5 animate-pulse rounded-full bg-slate-200/80" />
				<div className="h-4 w-full animate-pulse rounded-full bg-slate-200/80" />
				<div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200/80" />
				<div className="flex items-center justify-between pt-2">
					<div className="h-8 w-20 animate-pulse rounded-full bg-slate-200/80" />
					<div className="h-10 w-24 animate-pulse rounded-2xl bg-slate-200/80" />
				</div>
			</div>
		</div>
	);
};

export default CourseCardSkeleton;
