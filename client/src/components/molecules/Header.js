import React, { useState, useRef, useEffect } from "react";
import Button from "../atoms/MenuButton.js";
import "../../css/Header.css";
import PersonIcon from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";
import AddIcon from "@material-ui/icons/Add";
import FlagIcon from "@material-ui/icons/Flag";
import DescriptionIcon from "@material-ui/icons/Description";
import CompareIcon from "@material-ui/icons/Compare";
import InfoIcon from "@material-ui/icons/Info";
import Search from "./Search.js";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const [menuWillDeactivate, setMenuWillDeactivate] = useState(true);

  const menuToggle = () => {
    if (menu) {
      setMenuWillDeactivate(true);
      setTimeout(() => {
        setMenu(false);
      }, 200);
    } else {
      setMenu(true);
      setMenuWillDeactivate(false);
    }
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          menuToggle();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const MenuButton = ({ Icon, text }) => (
    <div className="flex flex-row items-center justify-left">
      <Icon fontSize="large" />
      {text}
    </div>
  );

  function Menu(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    if (props.active) {
      return (
        <div
          ref={wrapperRef}
          id={menuWillDeactivate ? "drawerInactive" : "drawerActive"}
          className="bg-main-one w-60 flex flex-col space-y-1 items-center py-2 fixed top-12 lg:hidden h-full shadow-leftShadow z-50"
        >
          <Button
            link="/allusers"
            text={<MenuButton Icon={PersonIcon} text={"All Players"} />}
          />
          <Button
            link="/allcountries"
            text={<MenuButton Icon={FlagIcon} text={"All Countries"} />}
          />
          <Button
            link="/compare"
            text={<MenuButton Icon={CompareIcon} text={"Compare"} />}
          />
          <Button
            link="/country/Global"
            text={<MenuButton Icon={PublicIcon} text={"Global Tracker"} />}
          />
          <Button
            link="/add"
            text={<MenuButton Icon={AddIcon} text={"Add New Player"} />}
          />
          <Button
            link="/stats"
            text={<MenuButton Icon={InfoIcon} text={"Fun Stats"} />}
          />
          <Button
            link="https://wiki.nzbasic.com/docs/osuTracker/aboutOsuTracker"
            target="_blank"
            text={<MenuButton Icon={DescriptionIcon} text={"API Docs"} />}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="z-50">
      <div className="h-12 w-full bg-main-one dark:bg-black dark:text-white fixed top-0 lg:static shadow z-50">
        <div className="flex justify-between xl:px-10 px-2 items-center h-full">
          <a className="text-lg font-semibold flex flex-row" href="/">
            <img
              className="object-contain h-10 "
              src="https://cdn.discordapp.com/attachments/627267590862929961/889763083776577546/ot.png"
              alt=""
            ></img>
            <div className="hidden lg:block self-center px-2">osuTracker</div>
          </a>
          <div className="flex flex-row items-center fixed right-2 lg:relative">
            <div className="z-0 static -top-p5 lg:-top-p75 absolute">
              <Search header={true} open={true} />
            </div>
            <div className="hidden lg:flex xl:space-x-2 lg:pl-56 xl:pl-72 select-none">
              <Button link="/allusers" text="All Players" />
              <Button link="/allcountries" text="All Countries" />
              <Button link="/compare" text="Compare" />
              <Button link="/country/Global" text="Global" />
              <Button link="/add" text="Add Player" />
              <Button link="/stats" text="Fun Stats" />
              <Button
                link="https://wiki.nzbasic.com/docs/osuTracker/aboutOsuTracker"
                target="_blank"
                text="API"
              />
            </div>
            <div
              className="lg:hidden ml-56 cursor-pointer hover:bg-main-two rounded-md p-1"
              onClick={menuToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50">
        <Menu active={menu} />
      </div>
    </div>
  );
}
