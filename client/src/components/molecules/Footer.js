import React from "react";
import GitHub from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import "../../css/Main.css";

export default function Footer() {
  return (
    <div
      id="thirdDiv"
      className=" my-4 w-full mx-2 bg-main-one h-12 inline-flex flex-row rounded-lg shadow justify-center self-center space-x-4"
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
    </div>
  );
}
