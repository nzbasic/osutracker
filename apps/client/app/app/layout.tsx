import React from "react";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen bg-white">
      <div className="flex w-full">
        <aside className="flex flex-col h-screen shrink-0 w-72 bg-white border-r border-edge h-screen overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="max-h-screen overflow-y-auto w-full p-2 bg-white">{children}</main>
      </div>
    </div>
  );
}
