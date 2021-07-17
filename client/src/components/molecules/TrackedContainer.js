import React from "react";
import Tracked from "../atoms/Tracked.js";

export default function TrackedContainer({ items }) {
  return (
    <div className="w-full flex p-2 flex-col items-center bg-main-one rounded-md space-y-1 shadow">
      {items.map((name) => (
        <Tracked name={name} key={name.name} />
      ))}
      {items.length === 0 ? "No Results" : null}
    </div>
  );
}
