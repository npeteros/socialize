"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NewPost, Sidebar } from "@/components/MainComponents";

export default function Home() {
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user.user || !user.token) router.push("/login");
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full justify-center pt-12">
                <section className="min-h-lvh w-1/2 rounded-2xl border border-neutral-800 bg-neutral-900 pt-2">
                    <NewPost />
                </section>
            </main>
        </div>
    );
}
