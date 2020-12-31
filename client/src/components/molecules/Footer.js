import React from "react";

export default function Header() {
  return (
      <div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#3B82F6" fill-opacity="1" d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
        </div>
        <div className="absolute bottom-10 ">
            <div className="flex flex-row w-screen justify-center">
                <h1 className="py-1 px-4">Website by nzbasic</h1>
                <a className="flex flex-row" href="https://github.com/nzbasic/osutracker" target="_blank">
                    <img alt="GitHub" src="https://cdn.discordapp.com/attachments/627267590862929961/794140189416357888/GitHub-Mark-32px.png"/>
                    <h1 className="py-1 px-1">View Source</h1>
                </a>
            </div>
        </div>
      </div>
    
  );
}