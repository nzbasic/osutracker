import "../styles/globals.css";
import { SearchBar } from "ui/components/search";
import { Outfit } from "next/font/google";
import Link from "next/link";
import cn from "classnames";
import { HiBars3 } from "react-icons/hi2";

const outfit = Outfit({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn(outfit.className, "min-h-screen")}>
            <head />
            <body className="flex min-h-screen flex-col items-start bg-primary-light">
                <header className="main w-full bg-primary-light py-4">
                    <div className="flex items-center justify-between px-4 md:px-0">
                        <Link
                            href="/"
                            className="flex items-center gap-1 font-bold"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary font-bold text-white">
                                oT
                            </div>
                            <p>
                                osu
                                <span className="text-lg text-primary">
                                    Tracker
                                </span>
                            </p>
                        </Link>

                        <nav className="flex items-center gap-8 text-sm transition-colors">
                            <SearchBar mini />
                            <div className="hidden gap-8 font-semibold tracking-wide md:flex">
                                <Link href="/" className="hover:text-primary">
                                    Meta Explorer
                                </Link>
                                <Link href="/" className="hover:text-primary">
                                    Stats
                                </Link>
                                <Link href="/" className="hover:text-primary">
                                    API
                                </Link>
                            </div>
                            <HiBars3 className="h-5 w-5 cursor-pointer hover:text-primary" />
                        </nav>
                    </div>
                </header>

                <main className="max-w-screen mb-auto w-screen overflow-x-hidden">
                    {children}
                </main>

                <div className="fixed bottom-0 hidden w-screen items-center justify-center bg-primary py-4 px-4 text-center font-semibold text-white md:flex md:text-lg">
                    <span>
                        Welcome to the new osuTracker website, you can access
                        the old site{" "}
                        <Link
                            className="underline"
                            href="https://osutracker.com"
                        >
                            here
                        </Link>
                    </span>
                </div>

                <footer className="flex w-full flex-col bg-neutral-700 text-white">
                    <div className="main bg-neutral-700 py-12 pb-24">
                        made by nzbasic
                    </div>
                </footer>
            </body>
        </html>
    );
}
