import { Sidebar } from "./MainComponents";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full justify-center pt-12">
                <section className="min-h-lvh w-2/5 rounded-2xl border border-neutral-800 bg-neutral-900 pt-2">
                    <div className="py-2 text-white">{children}</div>
                </section>
            </main>
        </div>
    );
}
