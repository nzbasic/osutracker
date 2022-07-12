import { useState, useEffect, useContext } from "react";
import stc from "string-to-color";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  CartesianGrid,
  Line,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { CountryPlayers } from "../../../../models/CountryPlayers.model";
import { ThemeContext } from "../../ThemeProvider";
import { CustomResponsiveContainer } from "./CustomResponsiveContainer";

interface TooltipTableItem {
    name: string
    pp: number
}

interface PlayerPoint {
    date: number;
    name: string;
    data: {
        [property: string]: number
    }
}

interface Player {
    name: string;
    colour: string;
}

export default function CountryPlayersGraph({ players }: { players: CountryPlayers[] }) {
  const [playerPoints, setPlayerPoints] = useState<PlayerPoint[]>([]);
  const [playerNames, setPlayerNames] = useState<Player[]>([]);
  const theme = useContext(ThemeContext);

  const CustomTooltip = ({ active, payload, label }: any) => {
    let table: TooltipTableItem[] = [];
    playerPoints.forEach((point) => {
      if (point.date === label) {
        table.push({ name: point.name, pp: point.data[point.name] });
      }
    });

    if (active) {
      return (
        <div className="bg-white dark:bg-dark01 rounded-md shadow-md p-2">
          <div className="label flex flex-col">
            {moment(label).format("DD M YY")}
            {table.map((data, index) => (
              <div className="font-medium text-stroke" style={{ color: stc(data.name) }} key={uuidv4()}>
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
    let dataPoints: PlayerPoint[] = [];
    let playerList: Player[] = [];

    players.sort((a, b) => a.date - b.date);

    players.forEach((point) => {
      point.listPlayers.forEach((player, index) => {
        dataPoints.push({
          date: point.date,
          name: player.name,
          data: {
            [player.name]: parseFloat(player.pp),
          }
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
    <div className="w-full h-full flex justify-center -ml-1 dark:text-white overflow-y-hidden">
        <CustomResponsiveContainer>
            <LineChart data={playerPoints} margin={{ top: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme?.mode === "light" ? "black" : "white"} />
            <XAxis
                stroke={theme?.mode === "light" ? "black" : "white"}
                dataKey="date"
                domain={["dataMin", "dataMax"]}
                name="Date"
                tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
                type="number"
            />

            <YAxis name="pp" domain={["dataMin", "dataMax"]} stroke={theme?.mode === "light" ? "black" : "white"} />
            <Tooltip content={<CustomTooltip />} />
            {playerNames.map((player) => {
                return (
                <Line
                    key={uuidv4()}
                    dot={false}
                    dataKey={(obj: PlayerPoint) => obj.data[player.name]}
                    strokeWidth={4}
                    stroke={player.colour}
                    connectNulls={true}
                    activeDot={{ stroke: player.colour, strokeWidth: 2, r: 4 }}
                    isAnimationActive={false}
                />
                );
            })}
            </LineChart>
        </CustomResponsiveContainer>
    </div>
  );
}
