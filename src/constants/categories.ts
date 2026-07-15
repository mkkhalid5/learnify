import type { IconType } from "react-icons";
import { FaCode, FaPalette, FaBullhorn, FaRobot } from "react-icons/fa";

export interface HomeCategory {
    id: number;
    title: string;
    totalCourses: number;
    icon: IconType;
}

export const categories: HomeCategory[] = [
    {
        id: 1,
        title: "Web Development",
        totalCourses: 120,
        icon: FaCode,
    },
    {
        id: 2,
        title: "UI/UX Design",
        totalCourses: 85,
        icon: FaPalette,
    },
    {
        id: 3,
        title: "Digital Marketing",
        totalCourses: 70,
        icon: FaBullhorn,
    },
    {
        id: 4,
        title: "AI & Machine Learning",
        totalCourses: 60,
        icon: FaRobot,
    },
];