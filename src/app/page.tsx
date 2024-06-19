"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthLayout, NewPost, Sidebar } from "@/components/MainComponents";

export default function Home() {
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user.user || !user.token) router.push("/login");
    }, []);

    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
