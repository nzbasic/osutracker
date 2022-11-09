import React from "react";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen justify-center bg-neutral-800">
      <div className="w-col flex">
        <aside className="flex h-screen w-72 flex-col bg-neutral-900">
          <Sidebar />
        </aside>
        <main className="w-full bg-neutral-900">{children}</main>
      </div>
    </div>
  );
}
