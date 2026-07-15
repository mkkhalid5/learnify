"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type UserMenuProps = {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
};

const UserMenu = ({ user }: UserMenuProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await authClient.signOut();

        if (res.error) {
            toast.error("Logout failed");
            return;
        }

        toast.success("Logged out successfully!");

        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button>
                    {user.name}
                </button>
            </Dropdown.Trigger>

            <Dropdown.Popover>
                <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                        <Link href={"/dashboard/profile"}>Profile</Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                    >
                        <Button onClick={handleLogout}>Logout</Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default UserMenu;