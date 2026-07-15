import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    let session: Awaited<ReturnType<typeof auth.api.getSession>> | null = null;

    try {
        session = await auth.api.getSession({
            headers: request.headers,
        });
    } catch {
        // If the session check fails (e.g. DB connectivity issue), allow through
        // so the page can still render with an unauthenticated state.
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;
    // Not logged in — redirect to login
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Logged-in user trying to access admin-only area
    const user = session.user as { role?: string };
    if (pathname.startsWith("/admin") && user.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
    ],
};