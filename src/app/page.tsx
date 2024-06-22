"use client";

import { AuthLayout, NewPost } from "@/components/MainComponents";
import { initAuth } from "@/lib/firebase";

export default function Home() {   
    const auth = initAuth();
    
    return (
        <AuthLayout>
            <NewPost />
        </AuthLayout>
    );
}
