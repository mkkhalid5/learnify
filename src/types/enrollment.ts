export interface Enrollment {
    _id: string;
    userId: string;
    courseId: string;
    courseTitle: string;
    courseThumbnail: string;
    courseSlug: string;
    coursePrice: number;
    status: "active";
    createdAt: string;
    updatedAt: string;
}

export interface EnrollmentStatus {
    enrolled: boolean;
    enrollment: Enrollment | null;
}
