import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

interface CardProps {
    href: string;
    children: JSX.Element;
    name: string;
    value: string;
    onClick?: () => void;
}

const Card = ({ name, value, href, children, onClick }: CardProps) => (
    <Link
        onClick={onClick}
        href={href}
        className="group flex gap-2 rounded-md border bg-gray-50 p-2 text-gray-800 hover:bg-sky-500 hover:text-white"
    >
        {children}
        <div className="flex h-full w-full items-start justify-between gap-1 text-base md:flex-col">
            <span className="p-0.25 rounded-md bg-gray-100 px-2 font-semibold group-hover:bg-sky-400 group-hover:text-white">
                {name}
            </span>
            <span className="py-0.25 ml-2 text-sm font-normal">{value}</span>
        </div>
        <HiChevronRight className="ml-auto h-5 w-5" />
    </Link>
);

export default Card;
