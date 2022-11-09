"use client";

import * as React from "react";
import Link from "next/link";
import classNames from "classnames";
import { SidebarSubItem } from "./SidebarSubItem";

interface SidebarItemProps {
  title: string;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  link: string;
  active: boolean;
  items: SubItem[];
}

interface SubItem {
  title: string;
  link: string;
}

export const SidebarItem = ({ link, Icon, title, active, items }: SidebarItemProps) => {
  return (
    <div className="border-t-[1px] border-neutral-800">
      <Link href={link}>
        <div className={classNames(
          { 'bg-blue-600': active },
          { 'bg-neutral-700': !active },
          "flex items-center gap-4 w-full text-l font-bold text-white p-2 rounded bg-neutral-700"
        )}>
          <Icon className="w-6 h-6" />
          {title}
        </div>
      </Link>
      
      {active && (
        <div>
          {items.length > 0 && (
            <div className="flex flex-col gap-1">
              {items.map((subItem) => (
                <SidebarSubItem
                  active={false}
                  key={link + subItem.link}
                  title={subItem.title}
                  link={link + subItem.link}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
