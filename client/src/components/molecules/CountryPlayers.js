import React, { useState, useEffect } from "react";
import stc from "string-to-color";
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
            {table.map((data) => (
              <div key={data.name}>{data.name + " " + data.pp + "pp"}</div>
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
    <div className="w-smgraph lg:w-graph h-graph bg-main-one p-0 lg:p-2 rounded-md shadow-lg">
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={playerPoints} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={["auto", "auto"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
            type="number"
          />

          <YAxis name="pp" domain={["dataMin", "dataMax"]} />
          <Brush
            dataKey="date"
            height={30}
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
          />
          <Tooltip content={<CustomTooltip />} />
          {playerNames.map((player) => {
            return (
              <Line
                key={player.name}
                dataKey={player.name}
                strokeWidth={2}
                stroke={player.colour}
                connectNulls={true}
                activeDot={{ stroke: player.color, strokeWidth: 2, r: 4 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
