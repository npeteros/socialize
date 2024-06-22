import { Sidebar } from "../MainComponents";
import { Skeleton } from "../ui/skeleton";

export default function AuthLayoutSkeleton() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="flex w-full justify-center pt-12">
                    <Skeleton className="min-h-lvh w-2/5 rounded-2xl border border-neutral-700 bg-neutral-900 pt-2" />
                </main>
            </div>
        </>
    );
}
