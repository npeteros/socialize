"use client";

import { LoggableAccount } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";

export function LoginCredentials() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoggableAccount>({
        resolver: zodResolver(signInSchema),
    });
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<LoggableAccount> = async (data) => {
        setError(false);
        return console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-2">
                <div>
                    <input
                        type="text"
                        className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                        aria-label="Username"
                        placeholder="Username"
                        {...register("username")}
                    />
                    {errors.username && (
                        <span className="text-xs text-red-500">
                            {errors.username.message}
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

export function LoginGithub() {
    const router = useRouter();
    const session = useSession();
    console.log(session);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await signInWithProvider("github")
        return console.log("Github");
    };

    return (
        <form onSubmit={onSubmit}>
            <button className="flex w-full items-center justify-center gap-4 rounded-md bg-neutral-900 py-2 font-semibold text-white">
                <span>
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z"></path>
                        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
                    </svg>
                </span>
                Log in with Github
            </button>
        </form>
    );
}
