import React from "react";

export default function TopMods({ data }) {
  const checkNoMod = (mods) => {
    if (mods.length == 0) {
      mods.push("No Mod");
    }
    return mods.toString();
  };

  return (
    <div className="mt-4 p-2 bg-main-one dark:bg-gray-700 dark:text-white rounded-md shadow-md flex flex-col">
      {data.map((mods, index) => (
        <div key={mods.mods.toString()}>
          {index + 1 + " " + checkNoMod(mods.mods) + ": " + mods.count}
        </div>
      ))}
    </div>
  );
}
