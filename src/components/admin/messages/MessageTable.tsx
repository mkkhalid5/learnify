"use client";

import { deleteMessage, markMessageStatus } from "@/lib/messages";
import { ContactMessage } from "@/types/message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import MessageRow from "./MessageRow";

interface Props {
    messages: ContactMessage[];
}

const MessageTable = ({ messages }: Props) => {
    const router = useRouter();
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleDeleteRequest = (message: ContactMessage) => {
        setSelectedMessage(message);
    };

    const handleDeleteClose = () => {
        if (isDeleting) {
            return;
        }
        setSelectedMessage(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedMessage) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteMessage(selectedMessage._id);
            toast.success("Message deleted successfully");
            setSelectedMessage(null);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete message");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleToggleStatus = async (message: ContactMessage) => {
        try {
            setUpdatingId(message._id);
            await markMessageStatus(message._id, message.status === "new" ? "read" : "new");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update message");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4" />
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Subject</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Received</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {messages.map((message) => (
                                <MessageRow
                                    key={message._id}
                                    message={message}
                                    onDelete={() => handleDeleteRequest(message)}
                                    onToggleStatus={() => handleToggleStatus(message)}
                                    isUpdatingStatus={updatingId === message._id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={selectedMessage !== null}
                title={selectedMessage?.name ?? ""}
                description={`Are you sure you want to delete this message from ${selectedMessage?.name ?? "this sender"}? This action cannot be undone.`}
                isLoading={isDeleting}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default MessageTable;
