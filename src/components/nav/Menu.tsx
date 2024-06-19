"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { signOut } from "@/lib/redux/reducers/userReducer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Menu() {
    const [showingMenu, setShowingMenu] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div className="relative my-12 text-white">
            {showingMenu && (
                <div className="absolute bottom-0 left-full mx-4 flex h-20 w-36 flex-col items-start justify-between rounded-xl bg-neutral-800">
                    <button className="w-full rounded-t-xl p-2 hover:bg-neutral-600">
                        Settings
                    </button>
                    <button
                        onClick={() => {
                            dispatch(signOut());
                            router.push("/login");
                        }}
                        className="w-full rounded-b-xl p-2 hover:bg-neutral-600"
                    >
                        Sign Out
                    </button>
                </div>
            )}
            <button
                onClick={() => setShowingMenu(!showingMenu)}
                className="relative text-neutral-600 hover:text-white"
            >
                <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3 4h18v2H3V4Zm0 7h12v2H3v-2Zm0 7h18v2H3v-2Z"></path>
                </svg>
            </button>
        </div>
    );
}
