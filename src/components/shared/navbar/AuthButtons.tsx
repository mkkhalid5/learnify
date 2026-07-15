"use client";

import ButtonLoader from "@/components/loading/ButtonLoader";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";

const AuthButtons = () => {
    const { data, isPending } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Keep the very first client render identical to the server-rendered
    // skeleton so React never has to discard/regenerate this subtree on
    // hydration (a mismatch here was breaking mount effects, e.g. framer
    // motion enter animations, for the whole page).
    if (!mounted || isPending) {
        return <ButtonLoader />;
    }

    if (!data) {
        return (
            <>
                <Link
                    href="/login"
                    className="hidden rounded-xl border px-5 py-2 lg:block"
                >
                    Login
                </Link>

                <Link
                    href="/register"
                    className="hidden rounded-xl bg-blue-500 px-5 py-2 text-white lg:block"
                >
                    Get Started
                </Link>
            </>
        );
    }

    return (
        <UserMenu user={data.user} />
    );
};

export default AuthButtons;