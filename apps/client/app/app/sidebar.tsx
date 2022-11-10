"use client";

import * as React from "react";
import { Logo, SearchBar } from "ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems, SidebarItem } from "ui";

export const Sidebar = () => {
  const [active, setActive] = React.useState(usePathname() ?? "");

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <Link href="/" className="mt-4 flex items-center gap-4 self-center">
        <Logo width={50} height={50} />
        <p className="text-xl font-bold leading-none">osuTracker</p>
      </Link>

      <SearchBar query="getUser">{(items) => <div></div>}</SearchBar>

      <div className="flex flex-col gap-2">
        {menuItems.map(({ title, link, Icon, subItems }) => (
          <SidebarItem
            title={title}
            link={link}
            Icon={Icon}
            subItems={subItems}
            currentActive={active}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
};
