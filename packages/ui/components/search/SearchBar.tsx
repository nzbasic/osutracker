"use client"

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useEffect } from 'react';

interface SearchBarProps {
  onOpen: () => void;
}

export const SearchBar = ({ onOpen }: SearchBarProps) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        onOpen()
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [onOpen])

  return (
    <>
      <div className="bg-gray-50 relative pointer-events-auto">
        <button 
          onClick={() => onOpen()}
          className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
        >
          <HiMagnifyingGlass className="mr-3 flex-none w-6 h-6" />
          Quick search...
          <div className="ml-auto text-xs text-gray-500 border hover:border-edge rounded py-0.5 px-2">
            /
          </div>
        </button>
      </div>
    </>
  );
};
