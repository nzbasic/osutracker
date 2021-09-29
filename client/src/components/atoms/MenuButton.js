import React from "react";

export default function MenuButton({ text, style, link, target }) {
  return (
    <a
      style={style}
      href={link}
      target={target ? target : ""}
      className="py-4 text-xl xl:text-base font-semibold xl:py-0 w-full xl:w-auto text-left px-4 xl:px-2 cursor-pointer xl:hover:text-main-four "
    >
      {text}
    </a>
  );
}
