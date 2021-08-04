import React from "react";
import Image from "./Image.js";
import { preventOverflow } from "../../util/text";

export default function Tracked({ name, open, select, item }) {
  return (
    <div
      onClick={() => {
        if (open) {
          if (name.type === "country") {
            window.location.href = "/country/" + name.name;
          } else {
            window.location.href = "/user/" + name.id;
          }
        } else {
          select(name, item);
        }
      }}
      className="w-full text-xs xl:text-base h-12 text-center justify-start px-2 rounded-sm border-gray-400 hover:bg-main-four cursor-pointer flex"
    >
      <div className="self-center outline-inner">
        <Image height={30} width={30} link={name.url} />
      </div>
      <div className="px-2 self-center">{preventOverflow(name.name, 9)}</div>
      <div className="self-center">{Math.floor(name.pp) + "pp"}</div>
    </div>
  );
}
