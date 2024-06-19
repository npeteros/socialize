"use client";

import { signIn } from "@/lib/firebase/firebaseActions";
import { LoggableAccount } from "@/lib/types";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoggableAccount>();

    const onSubmit: SubmitHandler<LoggableAccount> = async (data, e) => {
        e?.preventDefault();

        await signIn(data);
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
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 font-['Roboto'] text-sm placeholder:text-black placeholder:opacity-50"
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
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 font-['Roboto'] text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Password"
                            placeholder="Password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 4,
                                    message:
                                        "Password must contain atleast 4 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                </div>
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
