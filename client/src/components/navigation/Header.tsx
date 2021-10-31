import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { HomeLink } from "./HomeLink";
import { Menu } from "./Menu";
import { Search } from "./Search";
import { DarkMode } from "./DarkMode";
import { Animated } from "react-animated-css";
import { Spin as Hamburger } from 'hamburger-react'

export interface MenuItem {
    name: string
    path: string
    external?: boolean
}

const menuItems: MenuItem[] = [
    { name: "Home", path: "/" },
    { name: "Historic", path: "/historic" },
    { name: "Compare", path: "/compare" },
    { name: "All", path: "/all" },
    { name: "Stats", path: "/stats" },
    { name: "API", path: "https://james-46.gitbook.io/api-docs/", external: true }
]

export const Header = () => {
    const [active, setActive] = useState("")
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        // read the browser path and set menu item if applicable
        const path = window.location.pathname
        const match = path.match(/\/\w*/g)
        if (match) {
            const menuItem = menuItems.find(item => item.path === match[0])
            if (menuItem) {
                setActive(menuItem.name)
            }
        }
    }, [])

    useEffect(() => {
        setMenu(false)
    }, [active])

    return (
        <div className="w-screen z-50 font-medium dark:bg-blue-500 bg-blue-400 flex flex-col items-center ">

            <div className="h-16 flex md:hidden items-center justify-between main-width w-full px-4">
                <HomeLink setActive={setActive} />
                <div className="flex items-center gap-2">
                    <div className=""><DarkMode /></div>
                    <button className="text-white hover:text-black rounded-md transition duration-200 ease-in" onClick={() => setMenu(!menu)}>
                        <Hamburger size={20} toggled={menu}/>
                    </button>
                </div>
            </div>

            {menu && (
                <Animated className="block md:hidden w-full" animateOnMount={true} animationIn="slideInLeft" animationOut="slideOutLeft" isVisible={menu} animationInDuration={200} animationOutDuration={0}>
                    <Menu items={menuItems} active={active} setActive={setActive} />
                </Animated>
            )}
            
            <div className="hidden md:flex justify-between h-16 main-width w-full px-2 md:px-4">
                <div className="flex">
                    <HomeLink setActive={setActive} />
                    <div className="flex xl:pl-2">
                        {menuItems.map((item) => (
                            item.external ? (
                                <a key={item.name} href={item.path} target="_blank" rel="noreferrer" className="header-button">{item.name}</a>
                               
                            ) : (
                                <Link 
                                    key={item.name}
                                    to={item.path} 
                                    className={`header-button ${active === item.name && 'header-button-active'}`}
                                    onClick={() => setActive(item.name)}>
                                        {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="w-60">
                        <Search />
                    </div>
                    <DarkMode />
                </div>
            </div>
        </div>
    )
}

