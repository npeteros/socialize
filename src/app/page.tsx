"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthLayout, NewPost, Sidebar } from "@/components/MainComponents";

export default function Home() {
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
