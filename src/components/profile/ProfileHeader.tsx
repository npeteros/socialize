"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "./EditProfile";
import { sampleUser } from "@/lib/placeholder-data";

export default function ProfileHeader() {
    const user = sampleUser    

    return (
        <div className="my-4 flex h-20 flex-col gap-8 px-6 text-white">
            <div className="flex h-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold tracking-wider" >
                        {user && user.displayName}
                    </p>
                    <span className="text-sm">{user?.username}</span>
                </div>
                <div className="h-full">
                    <Avatar className="size-full">
                        <AvatarImage src={user?.imgUrl} />
                        <AvatarFallback>{user?.displayName}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <span className="text-justify text-sm">{user?.bio}</span>
            <EditProfile />
        </div>
    );
}
