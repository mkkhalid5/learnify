import {
  FaBook,
  FaStar,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { Stat } from "@/types/stat";

export const stats: Stat[] = [
  {
    id: 1,
    title: "Students",
    value: "25K+",
    icon: FaUserGraduate,
  },
  {
    id: 2,
    title: "Courses",
    value: "1500+",
    icon: FaBook,
  },
  {
    id: 3,
    title: "Instructors",
    value: "250+",
    icon: FaChalkboardTeacher,
  },
  {
    id: 4,
    title: "Average Rating",
    value: "4.9",
    icon: FaStar,
  },
];