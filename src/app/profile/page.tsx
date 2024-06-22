import { AuthLayout, ProfileHeader } from "@/components/MainComponents";
import { Suspense } from "react";

export default function Profile() {
    return (
        <AuthLayout>
            <ProfileHeader />
        </AuthLayout>
    );
}
