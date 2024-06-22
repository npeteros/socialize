"use client";

import { LoginForm } from "@/components/MainComponents";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
});

export default function Login() {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex h-screen flex-col items-center justify-center gap-6">
                <div className="flex w-full max-w-96 flex-col items-center border border-neutral-300 px-16 py-6">
                    <span
                        className={`mb-9 text-4xl font-bold ${dancingScript.className}`}
                    >
                        Socialize
                    </span>
                    <LoginForm />
                </div>
                <div className="flex w-full max-w-96 items-center justify-center gap-1 border border-neutral-300 px-16 py-6 text-sm">
                    <span>Don&apos;t have an account?</span>
                    <Link href="/register" className="text-[#4CB4F8]">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
