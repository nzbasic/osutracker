import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { useContext } from 'react';
import { ThemeContext } from "../../ThemeProvider";

export const DarkMode = () => {
    const theme = useContext(ThemeContext);

    return (
        <div className="ml-2">
            <button className="focus:outline-none p-1 text-white hover:text-black rounded-md transition duration-200 ease-in-out" onClick={() => theme?.toggle()}>
                {theme?.mode === "dark" ? <Brightness2Icon className=""/> : <WbSunnyIcon className="" />}
            </button>
        </div>
    )
}