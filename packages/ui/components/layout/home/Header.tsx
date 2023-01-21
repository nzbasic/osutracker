import * as React from "react";
import Link from "next/link";

import { HiOutlineSun } from 'react-icons/hi'
import { FaGithub, FaSun} from 'react-icons/fa'

import { Logo } from "../../util/Logo";

export const Header = () => {
  return (
    <header className="fixed top-0 z-40 bg-white flex h-16 w-full justify-center border-b border-edge text-black">
      <div className="flex items-center justify-between w-col h-full">
        <Link href="/" className="flex items-center gap-4">
          <Logo width={40} height={40} />
          <p className="text-xl font-semibold leading-none">osuTracker</p>
        </Link>
        <div className="flex items-center gap-4 text-base font-semibold">
          <HiOutlineSun className="w-6 h-6" />
          <FaGithub className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
