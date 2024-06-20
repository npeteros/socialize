"use client";

import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { useAppSelector } from "@/lib/redux/hooks";

export default function PostForm() {
    const [post, setPost] = useState("");
    const user = useAppSelector((state) => state.user.user);
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
