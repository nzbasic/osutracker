"use client";

import * as React from "react";
import Link from "next/link";
import classNames from "classnames";
import { SidebarSubItem, SidebarSubItemObject } from "./SidebarSubItem";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

interface SidebarItemProps {
  title: string;
  link: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  subItems: SidebarSubItemObject[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const iconSize = 24;

export const SidebarItem = ({
  link,
  Icon,
  title,
  subItems,
  active,
  setActive,
}: SidebarItemProps) => {
  const isActive = React.useMemo(() => active.startsWith(link), [active, link])

  return (
    <div>
      <Link
        onClick={() => setActive(link)}
        href={link}
        className={classNames(
          { "bg-blue-500 text-white": isActive },
          { "bg-white text-gray-700": !isActive },
          "rounded font-semibold transition-colors hover:bg-blue-500 hover:text-white",
          "flex gap-4 p-2"
        )}
      >
        <Icon width={iconSize} height={iconSize} />
        {title}
        <div className="flex-grow">
          <ChevronUpIcon
            className={classNames("ml-auto transition-all", { 'rotate-180': isActive })}
            width={iconSize}
            height={iconSize}
          />
        </div>
      </Link>
      {isActive && subItems.length > 0 && (
        <div className="ml-2 mt-2 flex gap-2">
          <span className="border-l-2 border-zinc-100" />
          <div className="flex flex-grow flex-col gap-2">
            {subItems.map((subItem) => (
              <SidebarSubItem
                title={subItem.title}
                parentLink={link}
                Icon={subItem.Icon}
                link={subItem.link}
                active={active}
                setActive={setActive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
