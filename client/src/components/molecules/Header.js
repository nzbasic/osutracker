import React, {useState} from 'react'
import Button from '../atoms/MenuButton.js'
import '../../css/Header.css'
import PersonIcon from '@material-ui/icons/Person'
import PublicIcon from '@material-ui/icons/Public'
import AddIcon from '@material-ui/icons/Add'
import FlagIcon from '@material-ui/icons/Flag';

export default function Header() {

    const [menu, setMenu] = useState(false)
    const [menuWillDeactivate, setMenuWillDeactivate] = useState(true)

    function menuToggle() {
        if (menu) {
            setMenuWillDeactivate(true)
            setTimeout(() => {
                setMenu(false)
            }, 200)
        } else {
            setMenu(true)
            setMenuWillDeactivate(false)
        }
    }
 
    function Menu(props) {
        if (props.active) {
            return ( 
                <div id={menuWillDeactivate ? "drawerInactive" : "drawerActive"} className="bg-main-one w-60 flex flex-col space-y-1 items-center py-2 fixed top-12 lg:hidden h-full shadow-leftShadow z-10">
                    <Button style={{marginTop: '-0.5rem'}} text={<div className="flex flex-row items-center justify-left"><PersonIcon fontSize="large"/>All Players</div>} />
                    <Button text={<div className="flex flex-row items-center justify-left"><FlagIcon fontSize="large"/>All Countries</div>} />
                    <Button text={<div className="flex flex-row items-center justify-left"><PublicIcon fontSize="large"/>Global Tracker</div>} />
                    <Button text={<div className="flex flex-row items-center justify-left"><AddIcon fontSize="large"/>Add New Player</div>} />
                </div>
            )
        } else {
            return <div></div>
        }
    }

    return (
        <div>
            <div className="w-screen h-12 bg-main-one fixed top-0 lg:static shadow z-50">
                <div className="flex justify-between lg:px-20 px-5 items-center h-full">
                    <a className="text-lg font-semibold flex flex-row" href="/">
                        <img
                            className="object-contain h-10 "
                            src="https://cdn.discordapp.com/attachments/627267590862929961/790060983229612062/ot.png"
                            alt=""
                        ></img>
                        <div className="self-center px-2">osuTracker</div>
                    </a>
                    <div className="hidden lg:flex space-x-5">
                        <Button text="All Players"/>
                        <Button text="All Countries"/>
                        <Button text="Global Tracker"/>
                        <Button text="Add New Player"/>
                    </div>
                    <div className="lg:hidden cursor-pointer hover:bg-main-two rounded-md p-1" onClick={menuToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                    </div>
                </div>
            </div>
            <Menu active={menu}/>
        </div>
    )
}
