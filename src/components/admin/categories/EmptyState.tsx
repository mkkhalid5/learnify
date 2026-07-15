"use client";

import Link from "next/link";

interface EmptyStateProps {
	title: string;
	description: string;
	actionHref?: string;
	actionLabel?: string;
}

const EmptyState = ({
	title,
	description,
	actionHref,
	actionLabel = "Create Category",
}: EmptyStateProps) => {
	return (
		<div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
			<h3 className="text-xl font-semibold text-slate-950">{title}</h3>
			<p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>

			{actionHref ? (
				<Link
					href={actionHref}
					className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
				>
					{actionLabel}
				</Link>
			) : null}
		</div>
	);
};

export default EmptyState;
