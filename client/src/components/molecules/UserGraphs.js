import React, { useState, useEffect } from "react";
import TimeSeriesChart from "./TimeSeriesChart.js";

export default function UserGraphs({ data }) {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [ppPoints, setPpPoints] = useState([]);
  const [accPoints, setAccPoints] = useState([]);
  const [playPoints, setPlayPoints] = useState([]);
  const [rankPoints, setRankPoints] = useState([]);
  const [farmPoints, setFarmPoints] = useState([]);
  const [rangePoints, setRangePoints] = useState([]);

  useEffect(() => {
    let pp = [];
    let acc = [];
    let play = [];
    let rank = [];
    let farm = [];
    let range = [];

    for (let i = 0; i < data.length; i++) {
      pp.push({
        x: data[i].date,
        y: parseInt(data[i].pp),
      });
      rank.push({
        x: data[i].date,
        y: parseInt(data[i].rank),
      });
      acc.push({
        x: data[i].date,
        y: Math.round((parseFloat(data[i].acc) + Number.EPSILON) * 100) / 100,
      });
      play.push({
        x: data[i].date,
        y: parseInt(data[i].plays),
      });

      if (data[i].farm) {
        farm.push({
          x: data[i].date,
          y: data[i].farm,
        });
      }

      if (data[i].range) {
        range.push({
          x: data[i].date,
          y: parseInt(data[i].range),
        });
      }
    }

    setPpPoints(pp.sort((a, b) => a.x - b.x));
    setAccPoints(acc.sort((a, b) => a.x - b.x));
    setRankPoints(rank.sort((a, b) => a.x - b.x));
    setPlayPoints(play.sort((a, b) => a.x - b.x));
    setFarmPoints(farm.sort((a, b) => a.x - b.x));
    setRangePoints(range.sort((a, b) => a.x - b.x));
  }, [data]);

  const arr = ["Pp", "Rank", "Acc", "Plays", "Farm", "Range"];

  return (
    <div className="inline-flex flex-col items-center py-2">
      <div className="flex space-x-1 bg-main-one p-2 rounded-md shadow-lg">
        {arr.map((name, index) => (
          <GraphButton
            key={name}
            text={name}
            onClick={() => setButtonIndex(index)}
            active={buttonIndex === index}
          />
        ))}
      </div>
      <div className="inline-flex justify-center">
        <div className="">
          <div className="bg-main-one inline-flex rounded-md pt-2 lg:w-graph w-smgraph md:px-2 my-4 h-96 shadow-lg">
            <ToggleGraph
              data={ppPoints}
              active={buttonIndex === 0}
              reversed={false}
            />
            <ToggleGraph
              data={rankPoints}
              active={buttonIndex === 1}
              reversed={true}
            />
            <ToggleGraph
              data={accPoints}
              active={buttonIndex === 2}
              reversed={false}
            />
            <ToggleGraph
              data={playPoints}
              active={buttonIndex === 3}
              reversed={false}
            />
            <ToggleGraph
              data={farmPoints}
              active={buttonIndex === 4}
              reversed={false}
            />
            <ToggleGraph
              data={rangePoints}
              active={buttonIndex === 5}
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
    } lg:text-2xl font-semibold shadow outline-inner bg-main-one p-1 text-xs md:text-base w-10 md:w-20 lg:w-32 text-center `}
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
