import React from "react";

export default function TopMappers({ data }) {
  return (
    <div className="bg-main-one mt-4 p-2 shadow-md rounded-md flex flex-col">
      {data.map((mapper, index) => (
        <div key={mapper.mapper}>
          {index + 1 + " " + mapper.mapper + ": " + mapper.count}
        </div>
      ))}
    </div>
  );
}
