"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

import Container from "@/components/shared/container/Container";
import { testimonials } from "@/lib/data/testimonials";

const Testimonials = () => {
    return (
        <section className="py-24">
            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="font-semibold text-primary uppercase tracking-wider">
                        Testimonials
                    </span>

                    <h2 className="mt-3 text-4xl font-bold lg:text-5xl">
                        What Our Students Say
                    </h2>

                    <p className="mt-5 text-default-500">
                        Thousands of learners trust Learnify to improve their skills and
                        grow their careers.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{
                                opacity: 1,
                                y: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            className="group rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Rating */}
                            <div className="mb-6 flex gap-1 text-yellow-500">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="mb-8 leading-7 text-default-600">
                                {testimonial.review}
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={60}
                                    height={60}
                                    className="h-15 w-15 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="font-semibold">
                                        {testimonial.name}
                                    </h3>

                                    <p className="text-sm text-default-500">
                                        {testimonial.designation}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Testimonials;