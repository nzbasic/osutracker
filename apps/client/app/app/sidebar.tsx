'use client'

import * as React from "react";
import { SidebarItem, SidebarSubItem, Logo, SearchBar } from "ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StarIcon, MagnifyingGlassIcon, BookOpenIcon, CodeBracketIcon, HomeIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

const menuItems = [
  { 
    title: 'Tracking',
    link: '/app/tracking',
    icon: StarIcon,
    items: [
      {
        title: 'Home',
        link: '',
        icon: HomeIcon,
        items: []
      },
      { 
        title: 'Historic',
        link: '/historic',
        icon: HomeIcon,
        items: []
      },
      {
        title: 'Compare',
        link: '/compare',
        icon: HomeIcon,
        items: []
      },
    ] 
  },
  { 
    title: 'Meta',
    link: '/app/meta',
    icon: BookOpenIcon,
    items: [],
  },
  {
    title: 'Query',
    link: '/app/query',
    icon: MagnifyingGlassIcon,
    items: [],
  },
  {
    title: 'API',
    link: '/app/api',
    icon: CodeBracketIcon,
    items: [],
  }
]

export const Sidebar = () => {
  const [active, setActive] = React.useState(usePathname() ?? '')

  return (
    <div className="flex flex-col w-full gap-4 p-2">
      <Link href="/" className="flex items-center mt-4 gap-4 self-center">
        <Logo width={50} height={50} />
        <p className="text-xl font-bold leading-none text-white">
          osuTracker
        </p>
      </Link>

      <SearchBar query="getUser" className="bg-neutral-700 text-white border-black">
        {(items) => (
          <div></div>
        )}
      </SearchBar>

      <div className="flex flex-col gap-2 text-white">
        {menuItems.map(({ title, link, icon, items }) => (
          <div key={link} className="flex flex-col gap-2">
            <Link 
              onClick={() => setActive(link)} 
              key={link} 
              href={link} 
              className={classNames(
                { 'bg-blue-600': active.startsWith(link) },
                { 'bg-neutral-700': !active.startsWith(link) },
                "rounded p-2 hover:bg-blue-600 transition-colors",
              )}
            >
              {title}
            </Link>
            {active.startsWith(link) && items.map(item => (
              <Link 
                onClick={() => setActive(link + item.link)} 
                key={item.link} 
                href={link + item.link} 
                className={classNames(
                  { 'bg-blue-600': active === link + item.link },
                  { 'bg-neutral-700': active !== link + item.link },
                  "rounded p-2 hover:bg-blue-600 transition-colors ml-8",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          
        ))}
      </div>
    </div>
  );
};
