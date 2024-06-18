"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function PostForm() {
    const [post, setPost] = useState("");
    return (
        <>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/7.jpg" />
                    <AvatarFallback>Test User</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-white">
                    <span>Test User</span>
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
