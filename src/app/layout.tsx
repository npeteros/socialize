import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    weight: '400'
 });

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
            <body className={`${roboto.className} bg-neutral-950`}>
                {children}
            </body>
        </html>
    );
}
