"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sampleUser } from "@/lib/placeholder-data";

export default function UserAvatar({
    src,
    className,
    onClick,
}: {
    src?: string,
    className?: string;
    onClick?: React.MouseEventHandler;
}) {
    const user = sampleUser;
    return (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage src={src ? src : user?.imgUrl} />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
        </Avatar>
    );
}
