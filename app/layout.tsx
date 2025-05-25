import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Welcome to Med Helper",
    description: "Your intelligent AI health companion for personalized advice, lab test analysis, and health tracking.",
    icons: {
        icon: "/favicon.png",
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                <Toaster />
                <SessionProvider>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
