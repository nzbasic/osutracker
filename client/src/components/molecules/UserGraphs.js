import React, { useState, useEffect } from "react";
import TimeSeriesChart from "./TimeSeriesChart.js";
import GraphDropdown from "../molecules/GraphDropdown.js";
import { ScatterGraph } from "../molecules/ScatterGraph.js";

export const userOptions = [
  { value: "pp", label: "Performance" },
  { value: "rank", label: "Rank", reversed: true },
  { value: "acc", label: "Accuracy" },
  { value: "plays", label: "Play Count" },
  { value: "farm", label: "Farm" },
  { value: "range", label: "Range" },
  { value: "score", label: "Score" },
  { value: "countryRank", label: "Country Rank", reversed: true },
  { value: "scatter", label: "Score Time Scatter" },
];

const data2 = [
  { date: "2021-09-29 10:32:49", pp: "544.456" },
  { date: "2021-06-02 12:15:53", pp: "543.381" },
  { date: "2021-10-11 13:07:23", pp: "515.403" },
  { date: "2021-06-01 13:14:02", pp: "494.779" },
  { date: "2020-06-12 06:45:25", pp: "484.634" },
  { date: "2021-05-25 06:23:10", pp: "474.171" },
  { date: "2020-05-24 06:56:11", pp: "466.61" },
  { date: "2020-12-26 06:08:00", pp: "465.123" },
  { date: "2020-12-25 12:09:39", pp: "462.204" },
  { date: "2021-10-11 14:16:13", pp: "453.618" },
  { date: "2021-09-29 12:24:18", pp: "451.915" },
  { date: "2020-12-26 06:57:08", pp: "451.202" },
  { date: "2021-05-30 05:37:09", pp: "449.188" },
  { date: "2021-10-02 14:01:46", pp: "449.142" },
  { date: "2020-09-13 12:16:33", pp: "437.535" },
  { date: "2021-06-21 07:45:01", pp: "436.349" },
  { date: "2021-09-25 12:39:42", pp: "434.653" },
  { date: "2021-02-11 06:22:18", pp: "432.59" },
  { date: "2021-08-03 05:24:27", pp: "432.014" },
  { date: "2021-02-10 10:19:01", pp: "429.118" },
  { date: "2020-06-13 06:28:35", pp: "428.601" },
  { date: "2021-05-25 08:01:05", pp: "428.539" },
  { date: "2021-09-25 13:40:53", pp: "427.995" },
  { date: "2021-06-12 14:55:45", pp: "426.929" },
  { date: "2021-02-18 06:06:51", pp: "423.905" },
  { date: "2021-09-26 06:01:26", pp: "422.506" },
  { date: "2021-09-29 10:08:28", pp: "421.589" },
  { date: "2021-09-29 12:15:17", pp: "421.076" },
  { date: "2020-06-14 07:32:43", pp: "419.505" },
  { date: "2021-10-11 14:00:24", pp: "415.039" },
  { date: "2020-05-02 11:03:15", pp: "414.968" },
  { date: "2020-09-28 12:03:06", pp: "411.973" },
  { date: "2020-12-26 07:52:45", pp: "411.959" },
  { date: "2021-08-19 09:06:35", pp: "411.022" },
  { date: "2020-05-14 14:13:43", pp: "409.357" },
  { date: "2020-06-13 05:49:12", pp: "408.498" },
  { date: "2021-02-20 05:24:16", pp: "407.77" },
  { date: "2021-02-10 08:38:52", pp: "406.543" },
  { date: "2021-09-17 05:41:43", pp: "406.047" },
  { date: "2021-08-06 14:11:00", pp: "405.353" },
  { date: "2021-09-29 13:06:17", pp: "404.427" },
  { date: "2021-02-12 04:57:43", pp: "403.102" },
  { date: "2021-06-02 12:33:42", pp: "402.148" },
  { date: "2021-06-12 15:43:55", pp: "400.415" },
  { date: "2021-10-11 14:59:54", pp: "399.64" },
  { date: "2021-02-13 08:15:45", pp: "398.704" },
  { date: "2020-11-23 05:31:11", pp: "398.187" },
  { date: "2021-02-19 07:38:40", pp: "395.402" },
  { date: "2021-05-25 07:27:28", pp: "392.58" },
  { date: "2021-02-18 05:54:32", pp: "392.055" },
  { date: "2021-06-21 08:18:47", pp: "391.761" },
  { date: "2020-05-19 00:54:02", pp: "389.485" },
  { date: "2021-01-31 10:40:19", pp: "386.192" },
  { date: "2020-05-16 14:05:20", pp: "384.434" },
  { date: "2021-01-31 11:15:02", pp: "383.581" },
  { date: "2021-10-11 14:36:19", pp: "382.267" },
  { date: "2020-04-30 13:14:46", pp: "382.084" },
  { date: "2021-02-12 04:48:17", pp: "382.028" },
  { date: "2021-06-14 13:55:44", pp: "381.579" },
  { date: "2021-06-14 11:56:06", pp: "381.35" },
  { date: "2021-02-10 09:50:14", pp: "380.522" },
  { date: "2021-06-14 13:19:05", pp: "379.898" },
  { date: "2021-02-13 07:22:17", pp: "379.036" },
  { date: "2021-06-17 12:35:28", pp: "377.765" },
  { date: "2021-02-22 12:40:31", pp: "377.272" },
  { date: "2021-02-11 05:18:09", pp: "375.832" },
  { date: "2021-02-13 07:08:56", pp: "375.603" },
  { date: "2021-02-22 11:56:12", pp: "375.229" },
  { date: "2021-02-12 04:33:16", pp: "373.96" },
  { date: "2020-12-25 12:16:17", pp: "373.366" },
  { date: "2021-01-31 11:46:39", pp: "372.89" },
  { date: "2021-09-29 09:55:30", pp: "371.092" },
  { date: "2020-12-26 09:58:24", pp: "370.559" },
  { date: "2021-01-31 10:30:14", pp: "369.56" },
  { date: "2020-05-30 03:54:25", pp: "366.622" },
  { date: "2021-08-19 08:22:39", pp: "366.152" },
  { date: "2020-05-12 06:33:46", pp: "363.67" },
  { date: "2021-07-31 04:28:17", pp: "363.393" },
  { date: "2021-08-13 08:01:48", pp: "363.186" },
  { date: "2021-10-06 08:58:11", pp: "362.247" },
  { date: "2021-06-02 11:49:31", pp: "362.03" },
  { date: "2021-09-30 14:24:51", pp: "360.101" },
  { date: "2020-05-23 12:23:36", pp: "358.351" },
  { date: "2021-02-12 03:51:57", pp: "358.076" },
  { date: "2021-02-13 07:38:38", pp: "357.99" },
  { date: "2021-09-16 06:29:45", pp: "357.03" },
  { date: "2020-11-28 09:08:57", pp: "356.951" },
  { date: "2021-06-02 11:42:08", pp: "356.367" },
  { date: "2020-06-13 04:52:39", pp: "355.767" },
  { date: "2021-02-12 04:16:25", pp: "354.623" },
  { date: "2021-06-14 12:16:24", pp: "353.913" },
  { date: "2020-05-23 03:00:05", pp: "353.049" },
  { date: "2021-09-30 04:28:19", pp: "351.701" },
  { date: "2021-04-03 09:36:42", pp: "350.393" },
  { date: "2021-04-28 03:48:09", pp: "349.536" },
  { date: "2021-02-22 12:54:53", pp: "347.756" },
  { date: "2021-06-17 13:14:12", pp: "347.703" },
  { date: "2021-08-07 09:24:26", pp: "347.56" },
  { date: "2021-09-29 09:29:04", pp: "347.341" },
  { date: "2021-07-06 12:43:23", pp: "346.423" },
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
          <div className="bg-main-one dark:bg-gray-400 dark:text-white inline-flex rounded-md pt-2 lg:w-graph w-smgraph md:px-2 my-4 h-96 shadow-lg">
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
            <ToggleGraph
              data={data2}
              active={graphType === "scatter"}
              scatter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ToggleGraph = ({ active, data, reversed, scatter }) => (
  <div className={`${active ? "block" : "hidden"} w-full h-full`}>
    {scatter ? (
      <ScatterGraph data={data2} />
    ) : (
      <TimeSeriesChart chartData={data} reversed={reversed} />
    )}
  </div>
);
