import React from "react";
import Tracked from "../atoms/Tracked.js";

export default function TrackedContainer({ items, term, shown }) {
  let list;
  if (term == "") {
    list = items
      .sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp))
      .slice(shown, shown + 5);
  } else {
    list = items.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 100);

    list.sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp));

    list = list.slice(shown, shown + 5);
  }

  return (
    <div className="flex flex-col items-center">
      {list.map((name) => (
        <Tracked name={name} key={name.name} />
      ))}
    </div>
  );
}
