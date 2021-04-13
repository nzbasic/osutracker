import React from "react";

export default function TopMappers({ data }) {
  return (
    <div className="bg-main-one mt-4 p-2 shadow-md rounded-md flex flex-col">
      {data.map((mapper, index) => (
        <a
          key={mapper.mapper}
          href={"https://osu.ppy.sh/users/" + mapper.mapper}
          target="_blank"
          rel="noreferrer"
          className="hover:text-main-four"
        >
          {index + 1 + " " + mapper.mapper + ": " + mapper.count}
        </a>
      ))}
    </div>
  );
}
