import Container from "@/components/shared/container/Container";
import { features } from "@/lib/data/features";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const stats = [
    { label: "Active Students", value: "25K+" },
    { label: "Premium Courses", value: "1.5K+" },
    { label: "Expert Instructors", value: "250+" },
    { label: "Average Rating", value: "4.9★" },
];

export default function AboutPage() {
    return (
        <section className="pt-32 pb-20">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        About Learnify
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                        Helping people learn without limits.
                    </h1>

                    <p className="mt-4 text-default-600">
                        Learnify is an online learning marketplace that connects curious
                        minds with industry experts. Our mission is simple: make
                        high-quality, practical education accessible to everyone,
                        anywhere.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-3xl border p-8 text-center"
                        >
                            <h3 className="text-3xl font-bold text-primary">
                                {stat.value}
                            </h3>
                            <p className="mt-2 text-sm text-default-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 grid items-center gap-14 lg:grid-cols-2">
                    <div className="space-y-5">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-default-600">
                            Learnify started with a simple idea: learning shouldn&apos;t be
                            limited by geography, budget, or rigid schedules. We built a
                            platform where instructors from around the world can share
                            their expertise, and where students can learn at their own
                            pace with courses that stay relevant to today&apos;s job market.
                        </p>
                        <p className="text-default-600">
                            Today, thousands of students trust Learnify to build real,
                            job-ready skills &mdash; from web development to design and
                            marketing &mdash; guided by instructors who have done the work
                            themselves.
                        </p>

                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-105"
                        >
                            Explore Courses
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.id}
                                    className="rounded-3xl border p-6"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <Icon className="text-2xl" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-default-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
