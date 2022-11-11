import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "../../util/Logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white flex h-16 w-full justify-center border-b border-edge text-black">
      <div className="flex items-center justify-between w-col h-full">
        <Link href="/" className="flex items-center gap-4">
          <Logo width={40} height={40} />
          <p className="text-xl font-semibold leading-none">osuTracker</p>
        </Link>
        <div className="flex items-center gap-8 text-base font-semibold">
          <Link href="/app/tracking">Tracking</Link>
          <Link href="/app/meta">Meta</Link>
          <Link href="/app/query">Query</Link>
          <Link href="/app/api">API</Link>
        </div>
      </div>
    </header>
  );
};
