export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
    id: number;
    title: string;
    description: string;
    instructor: string;
    image: string;
    category: string;
    level: CourseLevel;
    price: number;
    rating: number;
    totalStudents: number;
};

export interface AdminCourse {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    shortDescription: string;
    description: string;
    category: string;
    instructorId: string;
    level: CourseLevel | string;
    language: string;
    duration: string;
    price: number;
    discountPrice: number | null;
    requirements: string[];
    outcomes: string[];
    totalLessons: number;
    totalStudents: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CourseFormValues {
    title: string;
    slug: string;
    thumbnail: string;
    shortDescription: string;
    description: string;
    category: string;
    instructorId: string;
    level: string;
    language: string;
    duration: string;
    price: string;
    discountPrice: string;
    requirements: string[];
    outcomes: string[];
    totalLessons: string;
    totalStudents: string;
    status: string;
}

export interface CourseQueryParams {
    search: string;
    category: string;
    level: string;
    status: string;
    sort: string;
    page: number;
    limit: number;
}