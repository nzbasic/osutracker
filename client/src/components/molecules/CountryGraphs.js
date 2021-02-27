import React, { useEffect, useState } from "react";
import TimeSeriesChart from '../molecules/TimeSeriesChart'

export default function CountryGraphs({ stats }) {
  const [buttonIndex, setButtonIndex] = useState(0);
  const [ppPoints, setPpPoints] = useState([]);
  const [accPoints, setAccPoints] = useState([]);

  useEffect(() => {
    let pp = [];
    let acc = [];

    for (let i = 0; i < stats.length; i++) {
      pp.push({
        x: stats[i].date,
        y: parseInt(stats[i].pp),
      })
      if (parseFloat(stats[i].acc) > 0)
      acc.push({
        x: stats[i].date,
        y: (parseFloat(stats[i].acc) * 100).toFixed(2),
      })
    }

    pp.sort((a, b) => a.x - b.x);
    acc.sort((a, b) => a.x - b.x);

    setPpPoints(pp);
    setAccPoints(acc);
  }, [stats])

  let arr = ["Pp", "Acc"]

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
            <ToggleGraph data={ppPoints} active={buttonIndex === 0} reversed={false} />
            <ToggleGraph data={accPoints} active={buttonIndex === 1} reversed={false} />
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
)

const ToggleGraph = ({ active, data, reversed }) => (
  <div className={`${active ? "block" : "hidden"} w-full h-full`}>
    <TimeSeriesChart chartData={data} reversed={reversed} />
  </div>
)
