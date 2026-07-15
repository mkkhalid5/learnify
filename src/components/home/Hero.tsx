"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

import Container from "@/components/shared/container/Container";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-28 pb-20">
            {/* Background Blur */}
            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-7"
                    >
                        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            🚀 Learn From Industry Experts
                        </span>

                        <h1 className="text-4xl xl:text-7xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                          Learn Without
                            <span className="text-primary"> Limits</span>
                            <br />
                            Build Your Future.
                        </h1>

                        <p className="max-w-xl text-default-600">
                            Discover high-quality online courses from experienced instructors.
                            Gain practical skills, earn certificates, and advance your career
                            with Learnify.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/courses"
                                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-105"
                            >
                                Explore Courses
                                <FaArrowRight />
                            </Link>

                            <Link
                                href="/become-instructor"
                                className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-default-100"
                            >
                                Become Instructor
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-8 pt-6">
                            <div>
                                <h3 className="text-3xl font-bold text-primary">25K+</h3>
                                <p className="text-sm text-default-500">
                                    Students
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-primary">1.5K+</h3>
                                <p className="text-sm text-default-500">
                                    Courses
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-primary">4.9★</h3>
                                <p className="text-sm text-default-500">
                                    Average Rating
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        <Image
                            src="/hero.png"
                            alt="Learnify Hero"
                            width={600}
                            height={600}
                            priority
                            className="w-full max-w-md lg:max-w-xl"
                        />

                        {/* Floating Card */}
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                                rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                            className="absolute top-8 right-0 rounded-2xl bg-white p-5 shadow-xl"
                        >
                            <p className="text-sm text-default-500">
                                Live Students
                            </p>

                            <h3 className="text-2xl font-bold text-primary">
                                12,000+
                            </h3>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;