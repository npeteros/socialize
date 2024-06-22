"use client";

import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { User } from "firebase/auth";
import { initAuth } from "@/lib/firebase";

export default function PostForm() {
    const [post, setPost] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const auth = initAuth();

    auth.authStateReady().then(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
    });

    return (
        <>
            <div className="flex items-center gap-4">
                <UserAvatar />
                <div className="flex flex-col text-white">
                    <span>{user?.displayName}</span>
                    <input
                        type="text"
                        className="bg-transparent text-neutral-500 outline-none placeholder:text-neutral-500"
                        placeholder="Socialize..."
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}
