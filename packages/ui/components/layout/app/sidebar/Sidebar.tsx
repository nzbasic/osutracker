"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "../../../search/SearchBar";
import { menuItems } from "./items";
import { SidebarItem } from './SidebarItem';
import { SearchModal } from "../../../search/Modal";

export const Sidebar = () => {
  const [active, setActive] = React.useState(usePathname() ?? "");
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <nav className="fixed top-24 h-full flex flex-col shrink-0 w-64 bg-white overflow-y-auto">
        <div className="flex w-full flex-col justify-between gap-4 p-1 h-full">
          <div className="flex flex-col gap-8">
            <SearchBar onOpen={() => setShowModal(true)} />

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
        </div>   
      </nav>
      <SearchModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};
