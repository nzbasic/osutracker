"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SearchBar from "../../../search/SearchBar";
import { menuItems } from "./items";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
    const [active, setActive] = React.useState(usePathname() ?? "");

    return (
        <>
            <nav className="fixed top-24 flex h-full w-64 shrink-0 flex-col overflow-y-auto bg-white">
                <div className="flex h-full w-full flex-col justify-between gap-4 p-1">
                    <div className="flex flex-col gap-8">
                        <SearchBar />

                        <div className="flex flex-col gap-2">
                            {menuItems.map(
                                ({ title, link, Icon, subItems }) => (
                                    <SidebarItem
                                        key={title}
                                        title={title}
                                        link={link}
                                        Icon={Icon}
                                        subItems={subItems}
                                        currentActive={active}
                                        setActive={setActive}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
