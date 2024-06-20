"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks";

export default function UserAvatar({
    src,
    className,
    onClick,
}: {
    src?: string,
    className?: string;
    onClick?: React.MouseEventHandler;
}) {
    const user = useAppSelector((state) => state.user.user);
    return (
        <Avatar className={className} onClick={onClick}>
            <AvatarImage src={src ? src : user?.imgUrl} />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
        </Avatar>
    );
}
