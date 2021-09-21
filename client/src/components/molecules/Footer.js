import React, { useState, useEffect } from "react";
import GitHub from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import "../../css/Main.css";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const doc = document.documentElement;

    if (doc.classList.contains("dark")) {
      setDarkMode(false);
      doc.classList.remove("dark");
      localStorage.setItem("dark", false);
    } else {
      setDarkMode(true);
      doc.classList.add("dark");
      localStorage.setItem("dark", true);
    }
  };

  return (
    <div
      id="thirdDiv"
      className="inline-flex my-4 px-4 py-1 mx-2 bg-main-one dark:text-white dark:bg-gray-700 h-12 flex-row rounded-lg shadow justify-center self-center space-x-4 z-0"
    >
      <div className="self-center">nzbasic</div>
      <a
        href="https://github.com/nzbasic/osutracker"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <GitHub fontSize="small" />
      </a>
      <a
        href="https://twitter.com/nzbasic"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <TwitterIcon fontSize="small" />
      </a>
      <a
        href="https://osu.ppy.sh/users/9008211"
        target="_blank"
        rel="noreferrer"
        className="flex items-center hover:text-main-four cursor-pointer"
      >
        osu!
      </a>
      <button className="focus:outline-none" onClick={() => toggleDarkMode()}>
        {darkMode ? <Brightness2Icon /> : <WbSunnyIcon />}
      </button>
    </div>
  );
}
