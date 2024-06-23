"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatarSkeleton from "../skeletons/UserAvatarSkeleton";
import useUser from "@/lib/hooks/useUser";

export default function UserAvatar({
    src,
    className,
    onClick,
}: {
    src?: string;
    className?: string;
    onClick?: React.MouseEventHandler;
}) {
    const user = useUser();

    return !user ? (
        <UserAvatarSkeleton />
    ) : (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage src={src ? src : (user?.photoURL as string)} className="object-cover" />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
        </Avatar>
    );
}
