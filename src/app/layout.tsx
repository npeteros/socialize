import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
    title: "Socialize",
    description: "A social media platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-neutral-950">
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
