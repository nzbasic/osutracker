import React from "react";
import { Sidebar } from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-col mx-auto">
      <div className="flex w-full gap-8 h-[calc(100vh-5rem)]">
        <Sidebar />
        <main className="h-full mt-8 ml-80 w-col mx-auto w-full bg-white">{children}</main>
      </div>
    </div>
  );
}
