"use client"

import classNames from 'classnames';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface User {
  name: string;
}

interface Registry {
  getUser: User;
}

interface SearchBarProps<T extends keyof Registry> {
  className?: string;
  query: T;
  children: (items: Registry[T][]) => React.ReactNode;
}

export const SearchBar = <T extends keyof Registry>({ className, children, query }: SearchBarProps<T>) => {
  return (
    <div className="bg-white relative pointer-events-auto">
      <button 
        className={classNames(
          className, 
          "hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
        )} 
      >
        <MagnifyingGlassIcon className="mr-3 flex-none w-6 h-6" />
        Quick search...
      </button>
    </div>
  );
};
