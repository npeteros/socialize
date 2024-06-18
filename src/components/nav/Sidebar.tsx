import { Menu, NavLink } from '@/components/MainComponents'
import Link from 'next/link'

export default function Sidebar() {

    return (
        <div className="flex flex-col min-h-screen w-20 items-center py-4 justify-between">
            <div>
                <Link
                    href='/'
                    className="text-4xl font-bold text-white"
                >
                    S
                </Link>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
                <NavLink
                    link="/"
                >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M11.512.23a.75.75 0 0 1 .976 0l11.462 9.825V21.6a2.35 2.35 0 0 1-2.35 2.35h-6.4a.75.75 0 0 1-.75-.75v-4.8a2.45 2.45 0 0 0-4.9 0v4.8a.75.75 0 0 1-.75.75H2.4A2.35 2.35 0 0 1 .05 21.6V10.055L11.512.231ZM1.55 10.746V21.6c0 .47.38.85.85.85h5.65V18.4a3.95 3.95 0 0 1 7.9 0v4.05h5.65c.47 0 .85-.38.85-.85V10.745L12 1.788 1.55 10.745Z" clipRule="evenodd"></path>
                    </svg>
                </NavLink>
                <NavLink
                    link="/search"
                >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M.05 10.4C.05 4.684 4.684.05 10.4.05c5.716 0 10.35 4.634 10.35 10.35 0 2.588-.95 4.954-2.52 6.77l5.5 5.5-1.06 1.06-5.5-5.5a10.31 10.31 0 0 1-6.77 2.52C4.684 20.75.05 16.116.05 10.4ZM10.4 1.55a8.85 8.85 0 1 0 0 17.7 8.85 8.85 0 0 0 0-17.7Z" clipRule="evenodd"></path>
                    </svg>
                </NavLink>
                <NavLink
                    link="/notifications"
                >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.457 3.15a4.907 4.907 0 0 0-3.47 8.377L12 20.538l9.013-9.013a4.907 4.907 0 1 0-6.94-6.939L12.53 6.13a.75.75 0 0 1-1.06 0L9.927 4.587a4.907 4.907 0 0 0-3.47-1.437ZM.05 8.057a6.407 6.407 0 0 1 10.937-4.53L12 4.539l1.013-1.012a6.407 6.407 0 1 1 9.06 9.06L12.53 22.13a.75.75 0 0 1-1.06 0l-9.543-9.543A6.407 6.407 0 0 1 .05 8.057Z" clipRule="evenodd"></path>
                    </svg>
                </NavLink>
                <NavLink
                    link="/profile"
                >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12 1.55a4.048 4.048 0 0 0-4.05 4.047A4.048 4.048 0 0 0 12 9.644a4.048 4.048 0 0 0 4.05-4.047A4.048 4.048 0 0 0 12 1.55ZM6.45 5.597A5.548 5.548 0 0 1 12 .05a5.548 5.548 0 1 1 0 11.094 5.548 5.548 0 0 1-5.55-5.547ZM8.8 15.94a4.05 4.05 0 0 0-4.05 4.049v2.445h14.5V19.99a4.05 4.05 0 0 0-4.05-4.05H8.8Zm-5.55 4.05a5.55 5.55 0 0 1 5.55-5.55h6.4a5.55 5.55 0 0 1 5.55 5.55v3.946H3.25V19.99Z" clipRule="evenodd"></path>
                    </svg>
                </NavLink>
            </div>
            <Menu />
        </div>
    )
}