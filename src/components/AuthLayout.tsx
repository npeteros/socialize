"use client";

import { Sidebar } from "./MainComponents";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sampleUser } from "@/lib/placeholder-data";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = sampleUser
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full justify-center pt-12">
                <section className="min-h-lvh w-2/5 rounded-2xl border border-neutral-700 bg-neutral-900 pt-2">
                    {children}
                </section>
            </main>
        </div>
    );
}
