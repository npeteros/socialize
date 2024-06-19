"use client";

import { signUp } from "@/lib/actions";
import { RegisterableAccount } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues extends RegisterableAccount {
    confirmPass?: string;
}

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormValues>();
    const [error, setError] = useState<string | undefined>("");

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
        e?.preventDefault();

        delete data.confirmPass;

        const registeredDoc = await signUp(data).catch((err) =>
            console.error("Error: ", err),
        );

        if (registeredDoc?.status == 200) router.push("/login");
        else {
            setError(registeredDoc?.msg);
            reset();
        }
    };

    const password = watch("password", "");

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
                            aria-label="Email address"
                            placeholder="Email address"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Username"
                            placeholder="Username"
                            {...register("username", {
                                required: "This field is required",
                                minLength: 3,
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
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="First Name"
                            placeholder="First Name"
                            {...register("fullName.firstName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.fullName?.firstName && (
                            <span className="text-xs text-red-500">
                                {errors.fullName?.firstName.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Last Name"
                            placeholder="Last Name"
                            {...register("fullName.lastName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.fullName?.lastName && (
                            <span className="text-xs text-red-500">
                                {errors.fullName?.lastName.message}
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
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must contain atleast 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            className="w-full rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1.5 text-sm placeholder:text-black placeholder:opacity-50"
                            aria-label="Confirm Password"
                            placeholder="Confirm Password"
                            {...register("confirmPass", {
                                required: "This field is required",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirmPass && (
                            <span className="text-xs text-red-500">
                                {errors.confirmPass.message}
                            </span>
                        )}
                    </div>
                </div>
                {error && <span className="text-xs text-red-500">{error}</span>}
                <span className="text-center text-xs text-neutral-400">
                    By signing up, you agree to our Terms, Privacy Policy, and
                    Cookies Policy.
                </span>
                <button
                    type="submit"
                    className="rounded-lg bg-[#4CB4F8] py-1.5 text-sm text-white"
                >
                    Sign Up
                </button>
            </form>
        </>
    );
}
