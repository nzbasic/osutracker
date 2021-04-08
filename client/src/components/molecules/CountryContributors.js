import React from "react";

export default function CountryContributors({ contributors }) {
  contributors.sort((a, b) => parseInt(b.pp) - parseInt(a.pp));

  const Contributor = ({ data }) => (
    <div className="flex justify-between w-full bg-main-one shadow-md rounded-md p-2 ">
      <a
        className={`${
          data.name === "Bonus pp" && data.pp === 416.667
            ? ""
            : "hover:text-main-four cursor-pointer"
        } select-none `}
        href={
          data.name === "Bonus pp" && data.pp === 416.667
            ? null
            : "/redirect/" + data.name
        }
      >
        {data.name}
      </a>
      <div>{Math.round(data.pp) + "pp"}</div>
    </div>
  );

  return (
    <div className="flex flex-col w-full mb-6">
      <div className="self-center mb-6 bg-main-one rounded-md shadow-md p-2 font-semibold">
        Total PP Contributors
      </div>
      <div className="w-full flex flex-col items-center space-y-2">
        {contributors.map((data) => (
          <Contributor key={data.name} data={data} />
        ))}
      </div>
    </div>
  );
}
