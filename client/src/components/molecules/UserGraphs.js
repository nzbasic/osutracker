import React, { useState, useEffect } from "react";
import TimeSeriesChart from "./TimeSeriesChart.js";
import GraphDropdown from "../molecules/GraphDropdown.js";

export const userOptions = [
  { value: "pp", label: "Performance" },
  { value: "rank", label: "Rank", reversed: true },
  { value: "acc", label: "Accuracy" },
  { value: "plays", label: "Play Count" },
  { value: "farm", label: "Farm" },
  { value: "range", label: "Range" },
  { value: "score", label: "Score" },
  { value: "countryRank", label: "Country Rank", reversed: true },
];

export default function UserGraphs({ data }) {
  const [graphType, setGraphType] = useState("pp");

  const [ppPoints, setPpPoints] = useState([]);
  const [accPoints, setAccPoints] = useState([]);
  const [playPoints, setPlayPoints] = useState([]);
  const [rankPoints, setRankPoints] = useState([]);
  const [farmPoints, setFarmPoints] = useState([]);
  const [rangePoints, setRangePoints] = useState([]);
  const [scorePoints, setScorePoints] = useState([]);
  const [countryRankPoints, setCountryRankPoints] = useState([]);

  useEffect(() => {
    const pp = [];
    const acc = [];
    const play = [];
    const rank = [];
    const farm = [];
    const range = [];
    const score = [];
    const countryRank = [];

    for (let i = 0; i < data.length; i++) {
      const date = data[i].date;

      pp.push({
        x: date,
        y: parseInt(data[i].pp),
      });
      rank.push({
        x: date,
        y: parseInt(data[i].rank),
      });
      acc.push({
        x: date,
        y: Math.round((parseFloat(data[i].acc) + Number.EPSILON) * 100) / 100,
      });
      play.push({
        x: date,
        y: parseInt(data[i].plays),
      });

      if (data[i].farm) {
        farm.push({
          x: date,
          y: data[i].farm,
        });
      }

      if (data[i].range) {
        range.push({
          x: date,
          y: parseInt(data[i].range),
        });
      }

      if (data[i].score) {
        score.push({
          x: date,
          y: parseInt(data[i].score),
        });
      }

      if (data[i].countryRank) {
        countryRank.push({
          x: date,
          y: parseInt(data[i].countryRank),
        });
      }
    }

    setPpPoints(pp.sort((a, b) => a.x - b.x));
    setAccPoints(acc.sort((a, b) => a.x - b.x));
    setRankPoints(rank.sort((a, b) => a.x - b.x));
    setPlayPoints(play.sort((a, b) => a.x - b.x));
    setFarmPoints(farm.sort((a, b) => a.x - b.x));
    setRangePoints(range.sort((a, b) => a.x - b.x));
    setScorePoints(score.sort((a, b) => a.x - b.x));
    setCountryRankPoints(countryRank.sort((a, b) => a.x - b.x));
  }, [data]);

  const graphChange = (e) => {
    setGraphType(e.value);
  };

  return (
    <div className="inline-flex flex-col items-center py-2">
      <div className="">
        <GraphDropdown onChange={graphChange} options={userOptions} />
      </div>
      <div className="inline-flex justify-center">
        <div className="">
          <div className="bg-main-one dark:bg-gray-700 dark:text-white inline-flex rounded-md pt-2 lg:w-graph w-smgraph md:px-2 my-4 h-96 shadow-lg">
            <ToggleGraph
              data={ppPoints}
              active={graphType === "pp"}
              reversed={false}
            />
            <ToggleGraph
              data={rankPoints}
              active={graphType === "rank"}
              reversed={true}
            />
            <ToggleGraph
              data={accPoints}
              active={graphType === "acc"}
              reversed={false}
            />
            <ToggleGraph
              data={playPoints}
              active={graphType === "plays"}
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
              reversed={false}
            />
            <ToggleGraph
              data={scorePoints}
              active={graphType === "score"}
              reversed={false}
            />
            <ToggleGraph
              data={countryRankPoints}
              active={graphType === "countryRank"}
              reversed={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ToggleGraph = ({ active, data, reversed }) => (
  <div className={`${active ? "block" : "hidden"} w-full h-full`}>
    <TimeSeriesChart chartData={data} reversed={reversed} />
  </div>
);
