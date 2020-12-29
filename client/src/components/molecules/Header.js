import React from "react";
import Login from "../atoms/Login";

export default function Header() {
  return (
    <div className="lg:px-16 px-6 h-12 bg-blue-400 shadow-md flex flex-wrap items-center py-0">
      <div className="flex-1 flex justify-between items-center">
        <a href="/" className="flex flex-row">
          <img
            className="object-contain h-10 "
            src="https://cdn.discordapp.com/attachments/627267590862929961/790060983229612062/ot.png"
            alt=""
          ></img>
          <h1 className="self-center px-5">osuTracker</h1>
        </a>
      </div>
      <div className="">
        <Login />
      </div>
    </div>
  );
}
