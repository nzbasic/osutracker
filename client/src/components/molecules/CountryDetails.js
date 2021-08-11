import React from "react";
import Image from "../atoms/Image";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

export default function CountryDetails({ details }) {
  return (
    <div className="bg-main-one rounded-md shadow-lg inline-flex flex-wrap m-4 p-4 font-semibold text-xs lg:text-lg mt-16 lg:mt-4">
      <div className="flex">
        <div className="outline-inner w-40 lg:w-auto">
          {details.abbreviation === "" ? (
            <Image
              link={
                "https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg"
              }
              width={300}
            />
          ) : (
            <Image
              link={
                "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                details.abbreviation +
                ".svg"
              }
              height={200}
              width={300}
            />
          )}
        </div>
        <div className="flex flex-col justify-between ml-2 lg:m-2 lg:ml-2">
          <div>{details.name}</div>
          <div>{parseFloat(details.pp).toFixed(2) + "pp (Plays)"}</div>
          <div>{parseInt(details.playerWeighting ?? 0) + "pp (Players)"}</div>
          <div>{parseFloat(details.acc * 100).toFixed(2) + "%"}</div>
          <div className="flex">
            <div>{"Range: " + Math.round(details.range) + "pp"}</div>
            <Tooltip
              title="Performance difference between highest and lowest play in top 100."
              placement="bottom"
              className="self-center"
              TransitionComponent={Zoom}
            >
              <div className="pl-1 font-extrabold">(?)</div>
            </Tooltip>
          </div>
          <div className="flex">
            <div>{"Farm: " + details.farm + "%"}</div>
            <Tooltip
              title="Percentage of top plays that are in the top 727 most common map sets of tracked users."
              placement="bottom"
              className="self-center"
              TransitionComponent={Zoom}
            >
              <div className="pl-1 font-extrabold">(?)</div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
