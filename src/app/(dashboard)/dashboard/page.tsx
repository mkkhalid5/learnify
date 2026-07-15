import AdminOverview from "@/components/dashboard/AdminOverview";
import StudentOverview from "@/components/dashboard/StudentOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const role = (session?.user as { role?: string } | undefined)?.role ?? "user";

    if (role === "admin") {
        return <AdminOverview />;
    }

    return (
        <StudentOverview
            name={session?.user.name ?? "Student"}
            email={session?.user.email ?? ""}
            image={session?.user.image ?? null}
            joinedAt={
                session?.user.createdAt
                    ? new Date(session.user.createdAt).toISOString()
                    : new Date().toISOString()
            }
        />
    );
}
