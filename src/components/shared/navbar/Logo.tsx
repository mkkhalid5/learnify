import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa6";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
        <FaGraduationCap className="text-xl" />
      </div>
      <div className="leading-none">
        <h2 className="text-xl font-bold">Learnify</h2>
        <p className="text-xs text-default-500"> Learn Without Limits </p>
      </div>
    </Link>
  );
};

export default Logo;