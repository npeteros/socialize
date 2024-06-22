"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { initAuth, initFirestore, initStorage } from "@/lib/firebase";
import { storeOAuthUser } from "@/lib/actions";
import { Account, AccountWithID } from "@/lib/types";
import { getDownloadURL, ref } from "firebase/storage";
import { retrieveUserByID } from "@/lib/data";

interface FieldValues extends Account {
    password: string;
}

export function LoginEmail() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(signInSchema),
    });
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setError(false);
        const auth = initAuth();

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user.email) {
                    const userData = await retrieveUserByID(user.uid);
                    if (userData) {
                        await updateProfile(user, {
                            displayName: userData.displayName,
                            photoURL: userData.imgUrl,
                        });
                        router.push("/");
                    }
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-credential") setError(true);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-2">
                <div>
                    <input
                        type="email"
                        className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                        aria-label="Username"
                        placeholder="Email Address"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                        aria-label="Password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>
            </div>
            {error && (
                <span className="text-xs text-red-500">
                    Invalid credentials
                </span>
            )}
            <button
                type="submit"
                className="rounded-lg bg-[#4CB4F8] py-2 text-sm text-white"
            >
                Log In
            </button>
            <div className="mb-3 text-center text-sm font-semibold text-neutral-500">
                <span className="relative top-2.5 inline-block bg-white px-5">
                    OR
                </span>
                <div className="h-0.5 bg-neutral-300" />
            </div>
        </form>
    );
}

export function LoginGoogle() {
    const router = useRouter();

    const onSubmit = async () => {
        const provider = new GoogleAuthProvider();
        const auth = initAuth();

        await signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                if (!user.email || !user.photoURL || !user.displayName) return;

                const userData: AccountWithID = {
                    displayName: user.displayName,
                    email: user.email,
                    id: user.uid,
                    imgUrl: user.photoURL,
                    username: user.displayName.replace(/\s+/g, "").toLowerCase(),
                    bio: "No bio.",
                };
                await storeOAuthUser(userData)
                    .then(async () => {
                        const storage = initStorage();
                        const avatarsRef = ref(
                            storage,
                            `avatars/${user.uid}/avatar.jpg`,
                        );
                        await getDownloadURL(avatarsRef).then((url) => {
                            updateProfile(user, {
                                photoURL: url,
                            });
                        });

                        router.push("/");
                    })
                    .catch((err) => console.error(err));
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <button
            onClick={onSubmit}
            className="flex w-full items-center justify-center gap-4 rounded-md bg-blue-500 py-2 font-semibold text-white"
        >
            <span>
                <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.788 5.108A9 9 0 1 0 21 12h-8"></path>
                </svg>
            </span>
            Log in with Google
        </button>
    );
}

export function LoginGithub() {
    const router = useRouter();

    const onSubmit = () => {
        const provider = new GithubAuthProvider();
        const auth = initAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GithubAuthProvider.credentialFromError(error);
                // ...
                console.log("sdaasdsadsa", errorMessage);
            });
    };

    return (
        <button
            onClick={onSubmit}
            className="flex w-full items-center justify-center gap-4 rounded-md bg-neutral-900 py-2 font-semibold text-white"
        >
            <span>
                <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z"></path>
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
                </svg>
            </span>
            Log in with Github
        </button>
    );
}
