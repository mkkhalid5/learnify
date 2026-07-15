const EmptyState = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
			<h3 className="text-xl font-semibold text-slate-950">{title}</h3>
			<p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>
		</div>
	);
};

export default EmptyState;
