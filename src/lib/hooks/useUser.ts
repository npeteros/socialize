import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { initAuth } from "../firebase";
import { useRouter } from "next/navigation";

export default function useUser() {
    const auth = initAuth();
    const router = useRouter();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        auth.authStateReady().finally(() => {
            if (auth.currentUser) setUser(auth.currentUser);
            else router.push('/login')
        });
    }, [auth, router]);

    return user;
}