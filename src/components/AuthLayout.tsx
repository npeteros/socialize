"use client";

import { initAuth } from "@/lib/firebase";
import { Sidebar } from "./MainComponents";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import AuthLayoutSkeleton from "./skeletons/AuthLayoutSkeleton";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const auth = initAuth();
    const router = useRouter();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        auth.authStateReady().finally(() => {
            if (!auth.currentUser) return router.push("/login");
            else setUser(auth.currentUser);
        });
    }, [auth, router]);

    return !user ? <AuthLayoutSkeleton /> : (
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
