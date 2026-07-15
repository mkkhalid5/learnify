import Container from "@/components/shared/container/Container";
import { fetchCourses } from "@/lib/courses";
import CourseCard from "./CourseCard";

const FeaturedCourses = async () => {
  let courses: Awaited<ReturnType<typeof fetchCourses>>["data"] = [];

  try {
    const response = await fetchCourses({
      status: "published",
      sort: "newest",
      page: 1,
      limit: 4,
    });
    courses = response.data;
  } catch {
    // API may not be available; render empty section gracefully
  }

  if (courses.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-slate-950">
            Featured Courses
          </h2>

          <p className="mt-4 text-slate-500">
            Learn from our most popular and recently published courses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCourses;