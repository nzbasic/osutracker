import React from "react";
import "../../css/Footer.css";

export default function Footer() {
  return (
    <div className="main">
      <div>
        <div className="invisible lg:visible">
          <img
            alt="failed to load"
            src="https://cdn.discordapp.com/attachments/627267590862929961/794149886026055680/wave.png"
            width="100%"
            height="20%"
          ></img>
        </div>
        <div className="absolute bottom-7 ">
          <div className="flex flex-row w-screen justify-center">
            <h1 className="py-1 px-4 text-main-four">Website by nzbasic</h1>
            <a
              className="flex flex-row"
              href="https://github.com/nzbasic/osutracker"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="GitHub"
                src="https://cdn.discordapp.com/attachments/627267590862929961/794140189416357888/GitHub-Mark-32px.png"
              />
              <h1 className="py-1 px-1 text-main-four">View Source</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
