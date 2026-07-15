"use client";

import { signIn } from "@/lib/auth-client";
import { LoginFormData, LoginErrors } from "@/types/auth";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState<LoginErrors>({
        email: "",
        password: ""
    });
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
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

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: "",
        };

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
        }

        setErrors(newErrors);

        return !Object.values(newErrors).some(
            (error) => error !== ""
        );
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true)
            const res = await signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (res.error) {
                toast.error(res.error.message || "Login failed");
                return;
            }
            toast.success("Logged In successfully!");
            setTimeout(() => {
                router.replace("/");
            }, 1000);
        }
        catch (error) {
            toast.error("Something went wrong!");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

                <p className="mt-2 text-gray-500">
                    Login to your account to continue learning.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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

                {/* Remember */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />

                        Remember me
                    </label>

                    <Button
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </Button>
                </div>

                {/* Login */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

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
                Don`t have an account?{" "}
                <Link
                    href="/register"
                    className="font-semibold text-blue-600"
                >
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;