"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
    children,
    link
}: {
    children: React.ReactNode,
    link: string
}) {
    const path = usePathname();
    const active = path === link;

    return (
        <Link
            href={link}
            className={`${active ? 'text-white' : 'text-neutral-600'} p-4 rounded-md hover:bg-neutral-900 hover:text-white`}
        >
            {children}
        </Link>
    )
}