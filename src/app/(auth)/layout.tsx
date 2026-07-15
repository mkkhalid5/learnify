import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import Link from "next/link";
import { FaBookOpen, FaGraduationCap, FaUsers } from "react-icons/fa";

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <section className="min-h-screen">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left Side */}
                <div className="hidden bg-primary px-12  lg:flex lg:flex-col lg:justify-center">
                    <Link
                        href="/"
                        className="mb-12 text-4xl font-bold"
                    >
                        Learnify
                    </Link>

                    <h1 className="max-w-md text-5xl font-bold leading-tight">
                        Learn New Skills & Build Your Dream Career
                    </h1>

                    <p className="mt-6 max-w-lg text-lg text-white/80">
                        Join thousands of students learning from industry experts around the world.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4">
                            <FaBookOpen className="text-2xl" />
                            <span>1500+ Premium Courses</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaGraduationCap className="text-2xl" />
                            <span>250+ Expert Instructors</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaUsers className="text-2xl" />
                            <span>25K+ Active Students</span>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;