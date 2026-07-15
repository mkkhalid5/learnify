"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/nav";

type DesktopMenuProps = {
  links: NavLink[];
};

const DesktopMenu = ({ links }: DesktopMenuProps) => {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary ${
                isActive ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}

              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;