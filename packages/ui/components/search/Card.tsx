import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi2';

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
    className="group flex gap-2 p-2 text-gray-800 bg-gray-50 rounded-md hover:bg-sky-500 hover:text-white transition-all border"
  >
    {children}
    <div className="flex flex-col items-start gap-1 text-base h-full">
      <span className="group-hover:bg-sky-400 group-hover:text-white bg-gray-100 rounded-md p-0.25 font-semibold px-2 transition-all">{name}</span>
      <span className="ml-2 font-normal py-0.25 text-sm">{value}</span>
    </div>
    <HiChevronRight className="w-5 h-5 ml-auto" />
  </Link>
)

export default Card;
