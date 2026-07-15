import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Learnify",
    description: "Modern LMS Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                    {children}
                    <Toaster position="top-right" />
            </body>
        </html>
    );
}