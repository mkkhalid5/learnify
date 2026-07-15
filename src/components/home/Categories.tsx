import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container/Container";
import { fetchCategories } from "@/lib/categories";
import { fetchCourses } from "@/lib/courses";
import { Category } from "@/types/category";
import { AdminCourse } from "@/types/course";
import { FaArrowRight } from "react-icons/fa6";

interface HomeCategoryCard {
    category: Category;
    courseCount: number;
}

function getDisplayCategories(categories: Category[], courses: AdminCourse[]): HomeCategoryCard[] {
    const counts = new Map<string, number>();

    for (const course of courses) {
        counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
    }

    return categories
        .map((category) => ({
            category,
            courseCount: counts.get(category.slug) ?? 0,
        }))
        .sort((left, right) => right.courseCount - left.courseCount)
        .slice(0, 4);
}

const Categories = async () => {
    let categories: Category[] = [];
    let courses: AdminCourse[] = [];

    try {
        const [categoriesResponse, coursesResponse] = await Promise.all([
            fetchCategories({ limit: 100 }),
            fetchCourses({ status: "published", page: 1, limit: 100, sort: "newest" }),
        ]);
        categories = categoriesResponse?.data ?? [];
        courses = coursesResponse?.data ?? [];
    } catch {
        // API may not be available; render empty section gracefully
    }

    const displayCategories = getDisplayCategories(categories, courses);

    if (displayCategories.length === 0) return null;

    return (
        <section className="py-24">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
                        Top Categories
                    </p>
                    <h2 className="mt-3 text-4xl font-semibold text-slate-950">
                        Browse the learning paths students choose most.
                    </h2>
                    <p className="mt-4 text-slate-500">
                        Find the perfect category for your next step and jump directly into the relevant courses.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {displayCategories.map(({ category, courseCount }) => (
                        <Link
                            key={category._id}
                            href={`/courses?category=${category.slug}`}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-44 overflow-hidden bg-slate-100">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="space-y-3 p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-xl font-semibold text-slate-950">
                                        {category.name}
                                    </h3>
                                    <FaArrowRight className="text-slate-400 transition group-hover:text-sky-600" />
                                </div>

                                <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                                    {category.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-600">
                                    <span>{courseCount} courses</span>
                                    <span className="font-medium text-sky-600">Explore</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Categories;