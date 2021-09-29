import React, { useState, useEffect } from "react";
import stc from "string-to-color";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "../../css/Chart.css";
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Brush,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function CountryPlayers({ players }) {
  const [playerPoints, setPlayerPoints] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);

  const CustomTooltip = ({ active, payload, label }) => {
    //console.log(label)

    let table = [];
    playerPoints.forEach((point) => {
      if (point.date === label) {
        table.push({ name: point.name, pp: point[point.name] });
      }
    });

    if (active) {
      return (
        <div className="text-main-three bg-main-one rounded-md shadow-md p-2">
          <div className="label flex flex-col">
            {moment(label).format("DD M YY")}
            {table.map((data, index) => (
              <div style={{ color: stc(data.name) }} key={uuidv4()}>
                {data.name + " " + data.pp + "pp"}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    let dataPoints = [];
    let playerList = [];

    players.sort((a, b) => a.date - b.date);

    players.forEach((point) => {
      point.listPlayers.forEach((player, index) => {
        dataPoints.push({
          date: point.date,
          [player.name]: parseFloat(player.pp),
          name: player.name,
        });
        let flag = true;
        playerList.forEach((name) => {
          if (name.name === player.name) {
            flag = false;
          }
        });
        if (flag)
          playerList.push({ name: player.name, colour: stc(player.name) });
      });
    });

    setPlayerNames(playerList);
    setPlayerPoints(dataPoints);
  }, [players]);

  return (
    <div className="w-smgraph lg:w-graph h-graph bg-main-one dark:bg-gray-400 dark:text-white p-0 lg:p-2 rounded-md shadow-lg">
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={playerPoints} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="black" />
          <XAxis
            stroke="black"
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
            type="number"
          />

          <YAxis name="pp" domain={["dataMin", "dataMax"]} stroke="black" />
          <Brush
            stroke="black"
            dataKey="date"
            height={30}
            travellerWidth={50}
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
          />
          <Tooltip content={<CustomTooltip />} />
          {playerNames.map((player) => {
            return (
              <Line
                key={uuidv4()}
                dot={false}
                dataKey={player.name}
                strokeWidth={4}
                stroke={player.colour}
                connectNulls={true}
                activeDot={{ stroke: player.color, strokeWidth: 2, r: 4 }}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
