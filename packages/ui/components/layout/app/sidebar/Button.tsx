"use client";

import { HiChevronDown } from 'react-icons/hi2';
import classNames from 'classnames';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface ButtonProps {
  setActive: (link: string) => void;
  link: string;
  isActive: boolean;
  Icon: IconType;
  title: string;
  hasChildren?: true;
}

const Button = ({ setActive, link, isActive, Icon, title, hasChildren }: ButtonProps) => {
  return (
    <Link
      onClick={() => setActive(link)}
      href={link}
      className={classNames(
        { "button-active": isActive },
        { "button-inactive": !isActive },
        "rounded font-semibold transition-colors",
        "flex gap-4 p-2 font-light items-center align-middle"
      )}
    >
      <Icon className={classNames('w-5 h-5', { 'text-blue-600': isActive })} />
      <span className="inline-block text-sm leading-6">{title}</span>
      {hasChildren && !isActive && (
        <div className="flex-grow">
          <HiChevronDown
            className={classNames("w-5 h-5 ml-auto transition-all", { 'rotate-180': isActive })}
          />
        </div>
      )}
    </Link>
  )
}

export default Button;
