import { FaBook, FaCog, FaEnvelope, FaFolderOpen, FaHome, FaSignOutAlt, FaUsers } from "react-icons/fa";

export const adminDashboardMenu = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: FaHome,
    },
    {
        title: "Categories",
        href: "/dashboard/admin/categories",
        icon: FaFolderOpen,
    },
    {
        title: "Courses",
        href: "/dashboard/admin/manage-courses",
        icon: FaBook,
    },
    {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: FaUsers,
    },
    {
        title: "Messages",
        href: "/dashboard/admin/messages",
        icon: FaEnvelope,
    },
    {
        title: "Settings",
        href: "/dashboard/admin/settings",
        icon: FaCog,
    },
    {
        title: "Logout",
        href: "/login",
        icon: FaSignOutAlt,
    },
];