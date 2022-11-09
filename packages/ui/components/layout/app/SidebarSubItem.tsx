"use client";

import * as React from "react";
import Link from "next/link";
import classNames from "classnames";

interface SidebarSubItemProps {
  title: string;
  link: string;
  active: boolean;
}

export const SidebarSubItem = ({ link, title, active }: SidebarSubItemProps) => {
  return (
    <Link 
      href={link} 
      className={classNames(
        { 'bg-blue-600': active },
        { 'bg-neutral-700': !active },
        "ml-16 text-l text-white bg-neutral-700 p-2 rounded font-semibold"
    )}>
      {title}
    </Link>
  );
};
