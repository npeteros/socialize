import Link from "next/link";
import { LoginEmail, LoginGithub, LoginGoogle } from "./Providers";

export default function LoginForm() {
    return (
        <div className="flex w-full flex-col gap-4">
            <LoginEmail />
            <LoginGoogle />
            <LoginGithub />
            <Link href="/" className="text-center text-xs">
                Forgot password?
            </Link>
        </div>
    );
}
