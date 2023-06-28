"use client";

import { HiChevronDown } from "react-icons/hi2";
import classNames from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
    setActive: (link: string) => void;
    link: string;
    isActive: boolean;
    Icon: IconType;
    title: string;
    hasChildren?: true;
}

const Button = ({
    setActive,
    link,
    isActive,
    Icon,
    title,
    hasChildren,
}: ButtonProps) => {
    return (
        <Link
            onClick={() => setActive(link)}
            href={link}
            className={classNames(
                { "button-active": isActive },
                { "button-inactive": !isActive },
                "rounded font-semibold transition-colors",
                "flex items-center gap-4 p-2 align-middle font-light"
            )}
        >
            <Icon
                className={classNames("h-5 w-5", { "text-blue-600": isActive })}
            />
            <span className="inline-block text-sm leading-6">{title}</span>
            {hasChildren && !isActive && (
                <div className="flex-grow">
                    <HiChevronDown
                        className={classNames(
                            "ml-auto h-5 w-5 transition-all",
                            { "rotate-180": isActive }
                        )}
                    />
                </div>
            )}
        </Link>
    );
};

export default Button;
