import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid';

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
    className="group flex items-center gap-2 p-2 text-gray-800 bg-gray-50 rounded-md hover:bg-sky-500 hover:text-white transition-all"
  >
    {children}
    <div className="flex flex-col items-start text-base">
      <span className="group-hover:bg-sky-400 bg-gray-100 rounded-md p-0.5 font-semibold px-2 transition-all">{name}</span>
      <span className="ml-2 font-normal">{value}</span>
    </div>
    <ChevronRightIcon className="w-5 h-5 ml-auto" />
  </Link>
)

export default Card;
