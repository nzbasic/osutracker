import React from "react";

export default function MenuButton({ text, style, link, target }) {
  return (
    <a
      style={style}
      href={link}
      target={target ? target : ""}
      className="py-4 text-xl lg:text-base font-semibold lg:py-0 w-full lg:w-auto text-left px-4 lg:px-2 cursor-pointer lg:hover:text-main-four hover:bg-gray-100 lg:hover:bg-white"
    >
      {text}
    </a>
  );
}
