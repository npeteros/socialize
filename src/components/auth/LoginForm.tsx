import Link from "next/link";
import { LoginCredentials, LoginGithub } from "./Providers";

export default function LoginForm() {
    return (
        <SessionProvider>
            <div className="flex w-full flex-col gap-4">
                {/* <LoginCredentials /> */}
                <LoginGithub />
                <Link href="/" className="text-center text-xs">
                    Forgot password?
                </Link>
            </div>
        </SessionProvider>
    );
}
