import {
    FaChalkboardTeacher,
    FaCertificate,
    FaLaptop,
    FaInfinity,
} from "react-icons/fa";

import { Feature } from "@/types/feature";

export const features: Feature[] = [
    {
        id: 1,
        title: "Expert Instructors",
        description: "Learn from experienced industry professionals.",
        icon: FaChalkboardTeacher,
    },
    {
        id: 2,
        title: "Certified Courses",
        description: "Receive certificates after course completion.",
        icon: FaCertificate,
    },
    {
        id: 3,
        title: "Learn Anywhere",
        description: "Study on desktop, tablet, or mobile.",
        icon: FaLaptop,
    },
    {
        id: 4,
        title: "Lifetime Access",
        description: "Access your purchased courses forever.",
        icon: FaInfinity,
    },
];