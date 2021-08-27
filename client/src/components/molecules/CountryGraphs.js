import React, { useEffect, useState } from "react";
import TimeSeriesChart from "../molecules/TimeSeriesChart";
import GraphDropdown from "../molecules/GraphDropdown.js";

export const countryOptions = [
  { value: "pp", label: "Performance", reversed: false },
  { value: "acc", label: "Accuracy", reversed: false },
  { value: "farm", label: "Farm", reversed: false },
  { value: "range", label: "Range", reversed: false },
  { value: "playerWeighting", label: "Player Weighted pp", reversed: false },
];

export default function CountryGraphs({ stats }) {
  const [graphType, setGraphType] = useState("pp");
  const [reversed, setReversed] = useState(false);

  const [ppPoints, setPpPoints] = useState([]);
  const [accPoints, setAccPoints] = useState([]);
  const [farmPoints, setFarmPoints] = useState([]);
  const [rangePoints, setRangePoints] = useState([]);
  const [playerWeightingPoints, setPlayerWeightingPoints] = useState([]);

  useEffect(() => {
    let pp = [];
    let acc = [];
    let farm = [];
    let range = [];
    let playerWeighting = [];

    for (let i = 0; i < stats.length; i++) {
      pp.push({
        x: stats[i].date,
        y: parseInt(stats[i].pp),
      });
      if (parseFloat(stats[i].acc) > 0)
        acc.push({
          x: stats[i].date,
          y: (parseFloat(stats[i].acc) * 100).toFixed(2),
        });

      if (stats[i].farm) {
        farm.push({
          x: stats[i].date,
          y: stats[i].farm,
        });
      }

      if (stats[i].range) {
        range.push({
          x: stats[i].date,
          y: stats[i].range.toFixed(2),
        });
      }

      if (stats[i].playerWeighting) {
        playerWeighting.push({
          x: stats[i].date,
          y: parseInt(stats[i].playerWeighting),
        });
      }
    }

    if (playerWeighting.length === 0) {
      playerWeighting.push({
        x: new Date().getTime(),
        y: 0,
      });
    }

    setPlayerWeightingPoints(playerWeighting.sort((a, b) => a.x - b.x));
    setPpPoints(pp.sort((a, b) => a.x - b.x));
    setAccPoints(acc.sort((a, b) => a.x - b.x));
    setFarmPoints(farm.sort((a, b) => a.x - b.x));
    setRangePoints(range.sort((a, b) => a.x - b.x));
  }, [stats]);

  const graphChange = (e) => {
    setGraphType(e.value);
    setReversed(e.reversed);
  };

  return (
    <div className="inline-flex flex-col items-center py-2">
      <div className="">
        <GraphDropdown onChange={graphChange} options={countryOptions} />
      </div>
      <div className="inline-flex justify-center">
        <div className="">
          <div className="bg-main-one inline-flex rounded-md pt-2 lg:w-graph w-smgraph md:px-2 my-4 h-96 shadow-lg">
            <ToggleGraph
              data={ppPoints}
              active={graphType === "pp"}
              reversed={false}
            />
            <ToggleGraph
              data={accPoints}
              active={graphType === "acc"}
              reversed={false}
            />
            <ToggleGraph
              data={farmPoints}
              active={graphType === "farm"}
              reversed={false}
            />
            <ToggleGraph
              data={rangePoints}
              active={graphType === "range"}
              reversed={true}
            />
            <ToggleGraph
              data={playerWeightingPoints}
              active={graphType === "playerWeighting"}
              reversed={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const GraphButton = ({ text, onClick, active }) => (
  <div
    className={`${
      active ? "bg-main-four" : "hover:bg-gray-400 cursor-pointer"
    } lg:text-2xl font-semibold shadow outline-inner bg-main-one p-1 w-16 lg:w-32 text-center `}
    onClick={onClick}
  >
    {text}
  </div>
);

const ToggleGraph = ({ active, data, reversed }) => (
  <div className={`${active ? "block" : "hidden"} w-full h-full`}>
    <TimeSeriesChart chartData={data} reversed={reversed} />
  </div>
);
