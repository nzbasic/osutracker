import React from "react";
import Tracked from "../atoms/Tracked.js";

export default function TrackedContainer({ items }) {
  let list = items.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 5);

  return (
    <div className="flex flex-col items-center">
      {list.map((name) => (
        <Tracked name={name} key={name.name} />
      ))}
    </div>
  );
}
