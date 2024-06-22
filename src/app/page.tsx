"use client";

import { AuthLayout, NewPost } from "@/components/MainComponents";
import { initAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
    const auth = initAuth();
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
        if (!user) router.push("/login");
    });
    
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
