import type { Metadata } from "next";
import "./globals.css";

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
            <body className="bg-neutral-950">{children}</body>
        </html>
    );
}
