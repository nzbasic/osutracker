import * as React from "react";
import Link from "next/link";

import { HiOutlineSun } from "react-icons/hi";
import { FaGithub, FaSun } from "react-icons/fa";

import Logo from "../../util/Logo";

export const Header = () => {
    return (
        <header className="border-edge fixed top-0 z-40 flex h-16 w-full justify-center border-b bg-white text-black">
            <div className="w-col flex h-full items-center justify-between">
                <Link href="/" className="flex items-center gap-4">
                    <Logo width={40} height={40} />
                    <p className="text-xl font-semibold leading-none">
                        osuTracker
                    </p>
                </Link>
                <div className="flex items-center gap-4 text-base font-semibold">
                    <HiOutlineSun className="h-6 w-6" />
                    <FaGithub className="h-6 w-6" />
                </div>
            </div>
        </header>
    );
};
