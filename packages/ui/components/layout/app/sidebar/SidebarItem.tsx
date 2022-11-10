"use client";

import React from "react";
import Button from "./Button";
import { MenuItem } from "./items";

interface SidebarItemProps {
  title: string;
  link: string;
  subItems?: MenuItem[]
  Icon: Icon;
  currentActive: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export const SidebarItem = ({
  title,
  link,
  Icon,
  currentActive,
  setActive,
  subItems
}: SidebarItemProps) => {
  const isActive = React.useMemo(() => currentActive.startsWith(link), [currentActive, link])

  return (
    <div>
      <Button 
        hasChildren
        setActive={setActive} 
        link={link} 
        isActive={isActive} 
        Icon={Icon} 
        title={title}        
      />
      {subItems && isActive && subItems.length > 0 && (
        <div className="ml-2 mt-2 flex gap-2">
          <span className="border-l-2 border-zinc-200" />
          <div className="flex flex-grow flex-col gap-2">
            {subItems.map((subItem) => (
              <Button
                title={subItem.title}
                Icon={subItem.Icon}
                link={subItem.link}
                isActive={currentActive.endsWith(subItem.link)}
                setActive={setActive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
