"use client";

import { HiMagnifyingGlass } from "react-icons/hi2";
import React, { useEffect } from "react";
import cn from "classnames";
import SearchModal from "./Modal";

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    mini?: true;
}

function SearchBar({
    placeholder = "Quick search...",
    className,
    mini,
}: SearchBarProps) {
    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        if (!mini) return;
        const listener = (e: KeyboardEvent) => {
            if (e.key === "/") {
                e.preventDefault();
                setShowModal(true);
            }
        };

        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
    }, [showModal, mini]);

    return (
        <>
            <SearchModal setShowModal={setShowModal} showModal={showModal} />

            {mini ? (
                <HiMagnifyingGlass
                    className="hover:text-primary h-5 w-5 cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
            ) : (
                <div
                    className={cn(
                        "pointer-events-auto relative bg-gray-50",
                        className
                    )}
                >
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full cursor-text items-center rounded-md bg-gray-50 py-1.5 pl-2 pr-3 text-sm leading-6 text-black/50 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 lg:flex"
                    >
                        <HiMagnifyingGlass className="mr-0 h-6 w-6 flex-none" />
                        <p>{placeholder}</p>
                        <div className="hover:border-edge ml-auto rounded border py-0.5 px-2 text-xs text-gray-500">
                            /
                        </div>
                    </button>
                </div>
            )}
        </>
    );
}

export default SearchBar;
