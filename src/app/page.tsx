"use client";

import { AuthLayout, NewPost, Sidebar } from "@/components/MainComponents";

export default function Home() {
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
