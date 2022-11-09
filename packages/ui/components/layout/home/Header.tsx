import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Logo } from "../../util/Logo";

export const Header = () => {
  return (
    <header className="flex h-24 w-screen bg-blue-800">
      <div className="flex items-center justify-between w-full h-full p-8">
        <Link href="/" className="flex items-center gap-4">
          <Logo width={50} height={50} />
          <p className="text-white text-xl font-bold leading-none">osuTracker</p>
        </Link>
        <div className="flex items-center gap-8 text-white text-lg font-semibold">
          <Link href="/app/meta">Meta</Link>
          <Link href="/app/tracking">Tracking</Link>
          <Link href="/app/query">Query</Link>
          <Link href="/app/api">API</Link>
        </div>
      </div>
    </header>
  );
};
