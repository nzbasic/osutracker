import React from "react";
import logo from "../../collection-helper.png";

export default function Ad() {
  return (
    <div className="bg-main-one shadow-md fixed bottom-5 left-5 rounded-md p-3 w-64 lg:block hidden text-sm">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Collection Helper Logo" className="lg:w-32"></img>
        <div className="flex flex-col mt-2">
          <span className="text-center">Check out Collection Helper!</span>
          <span className="mt-2">Features:</span>
          <span>- Create/Edit collections</span>
          <span>- Inbuilt Stream/Farm filters</span>
          <span>- Create custom filters using JavaScript</span>
          <span>- Automatic practice diff generator</span>
          <span>- Import/Export collections with beatmaps included</span>
          <span>- Mass download maps (stream, farm, loved etc.)</span>
          <a
            href="https://github.com/nzbasic/Collection-Helper"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 mt-4"
          >
            Click here to check it out!
          </a>
        </div>
      </div>
    </div>
  );
}
