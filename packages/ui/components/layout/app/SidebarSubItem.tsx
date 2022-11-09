"use client";

import * as React from "react";
import Link from "next/link";
import classNames from "classnames";
import { MinusIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export interface SidebarSubItemObject {
  title: string;
  link: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

interface SidebarSubItemProps extends SidebarSubItemObject {
  parentLink: string;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const iconSize = 24;

export const SidebarSubItem = ({
  title,
  parentLink,
  Icon,
  link,
  active,
  setActive,
}: SidebarSubItemProps) => {
  const isActive = React.useMemo(() => parentLink + link === active, [active, parentLink, link])

  return (
    <Link
      onClick={() => setActive(parentLink + link)}
      key={link}
      href={parentLink + link}
      className={classNames(
        { "bg-blue-500 text-white": isActive },
        { "bg-white text-gray-700": !isActive },
        "rounded font-semibold transition-colors hover:bg-blue-500 hover:text-white",
        "flex gap-4 p-2"
      )}
    >
      <Icon width={iconSize} height={iconSize} />
      {title}
    </Link>
  );
};
