"use client";

import Link from "next/link";
import { HiOutlineXMark } from "react-icons/hi2";

import { NavLink } from "@/types/nav";
import AuthButtons from "./AuthButtons";

type MobileMenuProps = {
    links: NavLink[];
    isOpen: boolean;
    onClose: () => void;
};

const MobileMenu = ({
    links,
    isOpen,
    onClose,
}: MobileMenuProps) => {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${isOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed right-0 top-0 z-50 h-screen w-80 bg-background shadow-xl transition-transform duration-300 lg:hidden ${isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="text-lg font-semibold">
                        Menu
                    </h2>

                    <button onClick={onClose}>
                        <HiOutlineXMark className="text-3xl" />
                    </button>
                </div>

                <nav className="flex flex-col p-5">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="rounded-xl px-4 py-3 transition hover:bg-default-100"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-6 border-t pt-6">
                        <AuthButtons />
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default MobileMenu;