import { LoginForm } from "@/components/MainComponents";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
});

export default function Login() {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center">
                <div className="my-3 flex w-full max-w-96 grow flex-col items-center border border-neutral-300 px-16 pb-6 pt-9">
                    <div
                        className={`mb-9 text-4xl font-bold ${dancingScript.className}`}
                    >
                        Socialize
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
