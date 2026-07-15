import { AdminCourse } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseGridProps {
    courses: AdminCourse[];
}

const CourseGrid = ({ courses }: CourseGridProps) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
};

export default CourseGrid;