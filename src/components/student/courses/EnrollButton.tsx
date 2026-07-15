"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

import { useSession } from "@/lib/auth-client";
import { enrollInCourse, fetchEnrollmentStatus } from "@/lib/enrollments";

interface EnrollButtonProps {
    courseId: string;
}

const EnrollButton = ({ courseId }: EnrollButtonProps) => {
    const { data, isPending } = useSession();
    const [checking, setChecking] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (!data) {
            setChecking(false);
            return;
        }

        let active = true;

        fetchEnrollmentStatus(courseId)
            .then((status) => {
                if (active) {
                    setEnrolled(status.enrolled);
                }
            })
            .catch(() => {
                // If the check fails, allow the user to try enrolling anyway.
            })
            .finally(() => {
                if (active) {
                    setChecking(false);
                }
            });

        return () => {
            active = false;
        };
    }, [courseId, data, isPending]);

    if (isPending || checking) {
        return (
            <div className="inline-flex h-[50px] w-40 animate-pulse items-center justify-center rounded-2xl bg-slate-100" />
        );
    }

    if (!data) {
        return (
            <Link
                href={`/login?next=/courses/${courseId}`}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Enroll Now
            </Link>
        );
    }

    if (enrolled) {
        return (
            <Link
                href="/dashboard/my-courses"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
                <FaCheckCircle />
                Enrolled — View in Dashboard
            </Link>
        );
    }

    const handleEnroll = async () => {
        try {
            setSubmitting(true);
            await enrollInCourse(courseId);
            setEnrolled(true);
            toast.success("Enrollment successful! Check your dashboard for booking details.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to enroll in this course");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleEnroll}
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {submitting ? "Enrolling..." : "Enroll Now"}
        </button>
    );
};

export default EnrollButton;
