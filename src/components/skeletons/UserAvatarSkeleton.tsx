import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserAvatarSkeleton() {
    return (
        <Avatar>
            <Skeleton className="size-full" />
        </Avatar>
    );
}
