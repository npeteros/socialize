"use client";

import EditProfile from "./EditProfile";
import { initAuth } from "@/lib/firebase";
import { UserAvatar } from "../MainComponents";
import { useEffect, useState } from "react";
import ProfileHeaderSkeleton from "../skeletons/ProfileHeaderSkeleton";
import { DocumentData } from "firebase/firestore";
import { retrieveUserByID } from "@/lib/data";

export default function ProfileHeader() {
    const [user, setUser] = useState<DocumentData | null>(null);
    const auth = initAuth();

    auth.authStateReady().then(async () => {
        if (auth.currentUser) {
            const userData = await retrieveUserByID(
                auth.currentUser.uid as string,
            );
            setUser(userData);
            console.log("DATA: ", userData);
        }
    });

    return !user ? (
        <ProfileHeaderSkeleton />
    ) : (
        <div className="my-4 flex h-20 flex-col gap-8 px-6 text-white">
            <div className="flex h-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold tracking-wider">
                        {user && user.displayName}
                    </p>
                    <span className="text-sm">{user && user.username}</span>
                </div>
                <div className="h-20 w-20">
                    <UserAvatar className="size-full" />
                </div>
            </div>
            <span className="text-justify text-sm">{user && user.bio}</span>
            <EditProfile />
        </div>
    );
}
