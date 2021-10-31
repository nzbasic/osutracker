import { useState, useEffect, useContext } from "react";
import stc from "string-to-color";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  CartesianGrid,
  Line,
  Brush,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { truncate } from "./util";
import { CompareData } from "../pages/Compare";
import { CustomResponsiveContainer } from "./CustomResponsiveContainer";
import { ThemeContext } from "../../ThemeProvider";

interface TooltipTableItem {
    name: string
    data: {
        [property: string]: number
    }
}

interface DataPoint {
    date: number;
    name: string;
    data: {
        [property: string]: number
    }
}

export default function CompareGraph({ compare, type, reversed }: { compare: CompareData[], type: string, reversed: boolean }) {
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [names, setNames] = useState<Set<string>>(new Set());
  const theme = useContext(ThemeContext);

  const CustomTooltip = ({ active, payload, label }: any) => {
    let table: TooltipTableItem[] = [];
    points.forEach((point) => {
      if (point.date + 4.64e7 > label && point.date - 4.64e7 < label) {
        table.push({ name: point.name, data: { [type]: point.data[point.name] } });
      }
    });

    const nameSet = new Set();
    table = table.filter((item) => {
      if (nameSet.has(item.name)) {
        return false;
      } else {
        nameSet.add(item.name);
        return true;
      }
    });

    table = table.sort((a: any, b: any) => parseFloat(b.data[type]) - parseFloat(a.data[type]));

    if (active) {
      return (
        <div className="bg-white dark:bg-gray-700 rounded shadow-md p-2">
          <div className="label flex flex-col">
            {moment(label).format("DD M YY")}
            {table.map((data, index) => (
              <div className="font-medium text-stroke" style={{ color: stc(data.name) }} key={uuidv4()}>
                {data.name + " " + truncate(data.data[type])}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    let dataPoints: DataPoint[] = [];
    const nameList = new Set<string>();
    const clone: CompareData[] = JSON.parse(JSON.stringify(compare))
    let count = 0;

    let lowestPoint = Number.MAX_VALUE;
    clone.forEach((item) => {
      if (!item.added || !item.data) {
        return;
      }

      count++;
      item.data = item.data.sort((a, b) => a.date - b.date);

      item.data.forEach((point, index) => {
        const name = item.user ? point.player : point.name;

        point["acc"] = item.user ? point["acc"] : point["acc"] * 100;
        if (point["acc"] === 0) {
          return;
        }

        const value = parseFloat(parseFloat(point[type]).toFixed(2));

        if (value < lowestPoint) {
          lowestPoint = value;
        }

        point[type] = dataPoints.push({
          date: point.date,
          data: { [name]: value },
          name: name,
        });

        nameList.add(name);
      });
    });

    dataPoints = dataPoints
      .filter((item) => item.data[item.name] !== lowestPoint)
      .sort((a, b) => a.date - b.date);

    if (count > 1) {
      let lastName = dataPoints[0].name;
      dataPoints = dataPoints.filter((point) => {
        if (lastName === point.name) {
          return false;
        } else {
          lastName = point.name;

          if (Number.isNaN(point.data[point.name])) {
            return false;
          }

          return true;
        }
      });
    }

    setNames(nameList);
    setPoints(dataPoints);
  }, [compare, type]);

  return (
    <div className="h-72 md:h-96 w-full -ml-2">
      <CustomResponsiveContainer>
        <LineChart data={points} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme?.mode === "light" ? "black" : "white"} />
          <XAxis
            stroke={theme?.mode === "light" ? "black" : "white"}
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
            type="number"
          />

          <YAxis
            stroke={theme?.mode === "light" ? "black" : "white"}
            name={type}
            domain={["dataMin", "dataMax"]}
            reversed={reversed}
            tickFormatter={truncate}
          />
          <Tooltip content={<CustomTooltip />} />
          {Array.from(names).map((name) => {
            return (
              <Line
                key={uuidv4()}
                dot={false}
                dataKey={(obj: DataPoint) => obj.data[name]}
                strokeWidth={4}
                stroke={stc(name)}
                connectNulls={true}
                activeDot={{ stroke: stc(name), strokeWidth: 2, r: 4 }}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </CustomResponsiveContainer>
    </div>
  );
}
