import React from "react";
import GitHub from "@material-ui/icons/GitHub";
import "../../css/Main.css";

export default function Footer() {
  return (
    <div
      id="thirdDiv"
      className=" my-4 w-full bg-main-one h-12 inline-flex flex-row rounded-lg shadow justify-center self-center"
    >
      <div className="self-center px-2">Site by nzbasic</div>
      <a
        href="https://github.com/nzbasic/osutracker"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <GitHub fontSize="small" />
        <div className="px-2 hover:text-main-four">View Source</div>
      </a>
    </div>
  );
}
