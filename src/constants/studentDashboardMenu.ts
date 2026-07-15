import { FaBook, FaGraduationCap, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";

export const studentDashboardMenu = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: FaHome,
    },
    {
        title: "My Courses",
        href: "/dashboard/my-courses",
        icon: FaGraduationCap,
    },
    {
        title: "My Profile",
        href: "/dashboard/profile",
        icon: FaUser,
    },
    {
        title: "Browse Courses",
        href: "/courses",
        icon: FaBook,
    },
    {
        title: "Logout",
        href: "/login",
        icon: FaSignOutAlt,
    },
];
