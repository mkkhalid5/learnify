"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import Container from "@/components/shared/container/Container";
import { sendContactMessage } from "@/lib/messages";
import { ContactMessageFormValues } from "@/types/message";

const initialFormData: ContactMessageFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const ContactPage = () => {
    const [formData, setFormData] = useState<ContactMessageFormValues>(initialFormData);
    const [errors, setErrors] = useState<Partial<ContactMessageFormValues>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Partial<ContactMessageFormValues> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            await sendContactMessage(formData);
            toast.success("Message sent! We'll get back to you soon.");
            setFormData(initialFormData);
            setErrors({});
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pt-32 pb-20">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        Get In Touch
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                        We&apos;d love to hear from you.
                    </h1>

                    <p className="mt-4 text-default-600">
                        Have a question about courses, partnerships, or anything else?
                        Send us a message and our team will respond as soon as possible.
                    </p>
                </div>

                <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 rounded-3xl border p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FaLocationDot />
                            </div>
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="mt-1 text-sm text-default-500">
                                    Rajshahi, Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-3xl border p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="mt-1 text-sm text-default-500">
                                    support@learnify.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-3xl border p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FaPhone />
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="mt-1 text-sm text-default-500">
                                    +880 1700-000000
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-3xl border p-8"
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-primary"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-primary"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="What is this about?"
                                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-primary"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Tell us how we can help"
                                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-primary"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default ContactPage;
