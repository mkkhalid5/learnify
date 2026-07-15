import {
    FaBook,
    FaHeart,
    FaHome,
    FaUser,
    FaCog,
} from "react-icons/fa";

export const dashboardMenu = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: FaHome,
    },
    {
        title: "My Courses",
        href: "/dashboard/my-courses",
        icon: FaBook,
    },
    {
        title: "Wishlist",
        href: "/dashboard/wishlist",
        icon: FaHeart,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: FaUser,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: FaCog,
    },
];