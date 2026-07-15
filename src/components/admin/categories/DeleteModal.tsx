"use client";

interface DeleteModalProps {
	isOpen: boolean;
	title: string;
	description: string;
	isLoading?: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const DeleteModal = ({
	isOpen,
	title,
	description,
	isLoading = false,
	onClose,
	onConfirm,
}: DeleteModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
			<div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
				<div className="space-y-2">
					<h2 className="text-xl font-semibold text-slate-950">
						Delete {title}
					</h2>
					<p className="text-sm text-slate-500">{description}</p>
				</div>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={onClose}
						disabled={isLoading}
						className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={onConfirm}
						disabled={isLoading}
						className="rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isLoading ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
