import { Skeleton } from "../ui/skeleton";
import UserAvatarSkeleton from "./UserAvatarSkeleton";

export default function ProfileHeaderSkeleton() {
    return (
        <div className="my-4 flex h-20 flex-col gap-8 px-6 text-white">
            <div className="flex h-full items-center justify-between">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-96" />
                    <Skeleton className="h-4 w-36" />
                </div>
                <UserAvatarSkeleton />
            </div>
            <Skeleton className="my-2 py-2 w-24" />
            <Skeleton className="rounded-lg border border-neutral-700 py-4 font-semibold" />
        </div>
    );
}
