"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { Sidebar } from "./MainComponents";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user.user || !user.token) router.push("/login");
    }, []);
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
