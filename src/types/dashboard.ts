import { AdminCourse } from "./course";

export interface DashboardSummary {
    totalCategories: number;
    totalCourses: number;
    totalStudents: number;
    revenue: number;
    recentCourses: AdminCourse[];
}

export interface DashboardSummaryResponse {
    success: boolean;
    message: string;
    data: DashboardSummary;
    error?: Record<string, unknown>;
}