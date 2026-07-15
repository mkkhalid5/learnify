"use client";

import { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";

import Container from "@/components/shared/container/Container";
import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

import { navLinks } from "@/constants/navLinks";
import AuthButtons from "./AuthButtons";


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled
                        ? "border-b border-default-200 bg-white/80 backdrop-blur-xl shadow-sm"
                        : "bg-transparent"
                    }`}
            >
                <Container>
                    <nav className="flex h-20 items-center justify-between">
                        <Logo />
                        <DesktopMenu links={navLinks} />
                        <div className="flex items-center gap-3">
                            <div className="hidden lg:flex">
                                <AuthButtons/>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="lg:hidden"
                                aria-label="Open Menu"
                            >
                                <HiBars3 className="text-3xl" />
                            </button>
                        </div>
                    </nav>
                </Container>
            </header>

            <MobileMenu
                links={navLinks}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </>
    );
};

export default Navbar;