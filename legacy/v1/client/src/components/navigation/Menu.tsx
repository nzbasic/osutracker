import { Link } from "react-router-dom"
import { MenuItem } from "./Header"
import { Search } from "./Search"

export const Menu = ({ items, setActive, active }: { items: MenuItem[], setActive: React.Dispatch<React.SetStateAction<string>>, active: string }) => {
  return (
    <div className="w-full bg-white dark:bg-dark00 flex flex-col pt-4 shadow-md">
      <div className="pb-4 px-4">
        <Search />
      </div>
      
      {items.map((item) => (
        <Link 
          key={item.name}
          to={item.path} 
          className={`header-menu-button ${active === item.name && 'header-menu-button-active'}`}
          onClick={() => setActive(item.name)}>
            {item.name}
        </Link>
      ))}
    </div>
  )
}