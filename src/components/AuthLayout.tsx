'use client';

import { initAuth } from "@/lib/firebase";
import { Sidebar } from "./MainComponents";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const auth = initAuth();
    const router = useRouter()

    useEffect(() => {
        auth.authStateReady().then(() => {
            if (!auth.currentUser) {
                router.push('/login')
            }
        });
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
