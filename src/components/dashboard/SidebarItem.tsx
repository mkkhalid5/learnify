"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type Props = {
    href: string;
    title: string;
    icon: IconType;
};

const SidebarItem = ({
    href,
    title,
    icon: Icon,
}: Props) => {
    const pathname = usePathname();

    const active = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
        >
            <Icon size={18} />

            <span>{title}</span>
        </Link>
    );
};

export default SidebarItem;