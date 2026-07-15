"use client";

import { ContactMessage } from "@/types/message";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa6";

interface Props {
    message: ContactMessage;
    onDelete: () => void;
    onToggleStatus: () => void;
    isUpdatingStatus?: boolean;
}

const MessageRow = ({ message, onDelete, onToggleStatus, isUpdatingStatus }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = new Date(message.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <>
            <tr className="transition hover:bg-slate-50/80">
                <td className="px-6 py-4">
                    <button
                        type="button"
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="text-slate-400 transition hover:text-slate-700"
                        aria-label="Toggle message"
                    >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </td>

                <td className="px-6 py-4 font-medium text-slate-950">{message.name}</td>

                <td className="px-6 py-4 text-sm text-slate-500">{message.email}</td>

                <td className="px-6 py-4 text-sm text-slate-600">{message.subject}</td>

                <td className="px-6 py-4">
                    <button
                        type="button"
                        onClick={onToggleStatus}
                        disabled={isUpdatingStatus}
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            message.status === "new"
                                ? "bg-sky-50 text-sky-700 ring-sky-600/20 hover:bg-sky-100"
                                : "bg-slate-50 text-slate-600 ring-slate-500/20 hover:bg-slate-100"
                        }`}
                    >
                        {message.status === "new" ? "New" : "Read"}
                    </button>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">{formattedDate}</td>

                <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={onDelete}
                            className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                        >
                            <FaTrash className="text-xs" />
                            Delete
                        </button>
                    </div>
                </td>
            </tr>

            {isExpanded ? (
                <tr className="bg-slate-50/60">
                    <td colSpan={7} className="px-6 py-4">
                        <p className="whitespace-pre-wrap text-sm text-slate-700">
                            {message.message}
                        </p>
                    </td>
                </tr>
            ) : null}
        </>
    );
};

export default MessageRow;
