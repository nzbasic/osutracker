"use client";

import * as React from "react";
import { Logo, SearchBar } from "ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems, SidebarItem } from "ui";

export const Sidebar = () => {
  const [active, setActive] = React.useState(usePathname() ?? "");

  return (
    <div className="flex w-full flex-col justify-between gap-4 p-4 h-full">
      <div className="flex flex-col gap-4">
        <Link href="/" className="my-4 flex items-center gap-4 self-center">
          <Logo width={50} height={50} />
          <p className="text-xl font-bold leading-none">osuTracker</p>
        </Link>

        <SearchBar />

        <div className="flex flex-col gap-2">
          {menuItems.map(({ title, link, Icon, subItems }) => (
            <SidebarItem
              key={title}
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
      
      <div className="self-center text-gray-700 font-semibold">Site by nzbasic and bluetayden</div>
    </div>
  );
};
