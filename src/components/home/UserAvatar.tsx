"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initAuth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import UserAvatarSkeleton from "../skeletons/UserAvatarSkeleton";

export default function UserAvatar({
    src,
    className,
    onClick,
}: {
    src?: string;
    className?: string;
    onClick?: React.MouseEventHandler;
}) {
    const [user, setUser] = useState<User | null>(null);
    const auth = initAuth();
    
    auth.authStateReady().then(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
    });

    return !user ? (
        <UserAvatarSkeleton />
    ) : (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage src={src ? src : (user?.photoURL as string)} className="object-cover" />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
        </Avatar>
    );
}
