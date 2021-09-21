import React from "react";
import Tracked from "../atoms/Tracked.js";

export default function TrackedContainer({ items, open, select, item }) {
  return (
    <div className="w-full flex p-2 flex-col items-center bg-main-one dark:bg-gray-700 dark:text-white dark:border-black border-gray-500 border-2 rounded-md space-y-1 shadow z-0">
      {items.map((name) => (
        <Tracked
          name={name}
          key={name.name}
          open={open}
          select={select}
          item={item}
        />
      ))}
      {items.length === 0 ? "No Results" : null}
    </div>
  );
}
