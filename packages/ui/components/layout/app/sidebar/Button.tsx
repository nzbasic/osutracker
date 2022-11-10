"use client";

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Link from 'next/link';

interface ButtonProps {
  setActive: (link: string) => void;
  link: string;
  isActive: boolean;
  Icon: Icon;
  title: string;
  hasChildren?: true;
}

const iconSize = 25;

const Button = ({ setActive, link, isActive, Icon, title, hasChildren }: ButtonProps) => {
  return (
    <Link
      onClick={() => setActive(link)}
      href={link}
      className={classNames(
        { "bg-gray-100 text-black": isActive },
        { "bg-white text-gray-500 hover:bg-blue-500 hover:text-white": !isActive },
        "rounded font-semibold transition-colors",
        "flex gap-4 p-2"
      )}
    >
      <Icon width={iconSize} height={iconSize} />
      {title}
      {hasChildren && (
        <div className="flex-grow">
          <ChevronDownIcon
            className={classNames("ml-auto transition-all", { 'rotate-180': isActive })}
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
    </Link>
  )
}

export default Button;
