"use client";

import { signUp } from "@/lib/auth-client";
import { uploadUserImage } from "@/lib/users";
import { RegisterErrors, RegisterFormData } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCamera, FaEye, FaEyeSlash, FaGoogle, FaSpinner } from "react-icons/fa";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState<RegisterErrors>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        try {
            setIsUploadingImage(true);
            const secureUrl = await uploadUserImage(file);
            setFormData((previous) => ({
                ...previous,
                image: secureUrl,
            }));
            toast.success("Profile photo uploaded");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Photo upload failed");
        } finally {
            setIsUploadingImage(false);
            e.target.value = "";
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
        // Name Validation
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }
        // Email Validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email";
        }
        // Password Validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        // Confirm Password Validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true)
            const res = await signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.image || undefined,
                callbackURL: "/"
            });

            if (res.error) {
                toast.error(res.error.message || "Registration failed");
                return;
            }
            toast.success("Account created successfully!");
            setTimeout(() => {
                router.replace("/");
            }, 1000);
        }
        catch (error) {
            toast.error("Something went wrong!");
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <div>
            {/* Header */}
            <div className="mb-8 mt-8">
                <h1 className="text-3xl font-bold">Create Account 🚀</h1>

                <p className="mt-2 text-gray-500">
                    Join Learnify and start learning today.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500"
                        name="email"
                        value={formData.email}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Password
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Confirm Password
                    </label>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full rounded-xl border px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Profile Photo */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Profile Photo (optional)
                    </label>

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-gray-300 bg-gray-50">
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FaCamera className="text-gray-400" />
                            )}
                        </div>

                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-gray-50">
                            {isUploadingImage ? <FaSpinner className="animate-spin" /> : <FaCamera />}
                            {isUploadingImage ? "Uploading..." : formData.image ? "Change Photo" : "Upload Photo"}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading || isUploadingImage}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-gray-300" />

                <span className="mx-3 text-sm text-gray-500">
                    OR
                </span>

                <div className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Google */}
            <button
                className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 transition hover:bg-gray-100"
            >
                <FaGoogle />

                Continue with Google
            </button>

            <p className="mt-8 text-center text-sm">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-blue-600"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;