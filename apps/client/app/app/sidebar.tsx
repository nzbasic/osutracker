"use client";

import * as React from "react";
import { SidebarItem, SidebarSubItem, Logo, SearchBar } from "ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  CodeBracketIcon,
  HomeIcon,
  ArrowsRightLeftIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";

const menuItems = [
  {
    title: "Tracking",
    link: "/app/tracking",
    Icon: ArrowTrendingUpIcon,
    subItems: [
      {
        title: "Home",
        link: "",
        Icon: HomeIcon,
      },
      {
        title: "Historic",
        link: "/historic",
        Icon: BookOpenIcon,
      },
      {
        title: "Compare",
        link: "/compare",
        Icon: ArrowsRightLeftIcon,
      },
    ],
  },
  {
    title: "Meta",
    link: "/app/meta",
    Icon: Square3Stack3DIcon,
    subItems: [],
  },
  {
    title: "Query",
    link: "/app/query",
    Icon: MagnifyingGlassIcon,
    subItems: [],
  },
  {
    title: "API",
    link: "/app/api",
    Icon: CodeBracketIcon,
    subItems: [],
  },
];

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
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
};
