"use client";

import { signInWithCredentials } from "@/lib/actions";
import { LoggableAccount } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoggableAccount>();
    const [error, setError] = useState<string | undefined>("");
    const router = useRouter();

    const onSubmit: SubmitHandler<LoggableAccount> = async (data, e) => {
        e?.preventDefault();

        const res = await signInWithCredentials(data);
        if (res.status == 200) {
            setError("");

            const value = {
                token: res.value.token,
                user: res.value.user,
            };
            router.push("/");
        } else {
            const { value } = res;
            reset();
            setError(value.error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4"
            >
                <div className="flex w-full flex-col gap-2">
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Username"
                            placeholder="Username"
                            {...register("username", {
                                required: "This field is required",
                            })}
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
                            {...register("password", {
                                required: "This field is required",
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                </div>
                {error && <span className="text-xs text-red-500">{error}</span>}
                <button
                    type="submit"
                    className="rounded-lg bg-[#4CB4F8] py-1 text-sm text-white"
                >
                    Log In
                </button>
                <Link href="/" className="text-center text-xs">
                    Forgot password?
                </Link>
            </form>
        </>
    );
}
