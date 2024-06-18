import { NewPost, Sidebar } from "@/components/MainComponents";

export default function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full justify-center pt-12">
                <section className="min-h-lvh w-1/2 rounded-2xl border border-neutral-800 bg-neutral-900 pt-2">
                    <NewPost />
                </section>
            </main>
        </div>
    );
}
