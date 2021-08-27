import React, { useState, useEffect } from "react";
import stc from "string-to-color";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import clonedeep from "lodash/cloneDeep";
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
import { truncate } from "./TimeSeriesChart.js";

export default function CompareGraph({ compare, type, reversed }) {
  const [points, setPoints] = useState([]);
  const [names, setNames] = useState([]);

  const CustomTooltip = ({ active, payload, label }) => {
    let table = [];
    points.forEach((point) => {
      if (point.date + 4.64e7 > label && point.date - 4.64e7 < label) {
        table.push({ name: point.name, [type]: point[point.name] });
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

    table = table.sort((a, b) => parseFloat(b[type]) - parseFloat(a[type]));

    if (active) {
      return (
        <div className="text-main-three bg-main-one rounded-md shadow-md p-2">
          <div className="label flex flex-col">
            {moment(label).format("DD M YY")}
            {table.map((data, index) => (
              <div style={{ color: stc(data.name) }} key={uuidv4()}>
                {data.name + " " + truncate(data[type])}
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
    const nameList = new Set();
    const clone = clonedeep(compare);
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
          [name]: value,
          name: name,
        });

        nameList.add(name);
      });
    });

    console.log(lowestPoint);

    dataPoints = dataPoints
      .filter((item) => item[item.name] !== lowestPoint)
      .sort((a, b) => a.date - b.date);

    if (count > 1) {
      let lastName = dataPoints[0].name;
      dataPoints = dataPoints.filter((point) => {
        if (lastName === point.name) {
          return false;
        } else {
          lastName = point.name;

          if (Number.isNaN(point[point.name])) {
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
    <div className="w-smgraph lg:w-graph h-graph bg-main-one p-0 lg:p-2 rounded-md shadow-lg">
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={points} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
            type="number"
          />

          <YAxis
            name={type}
            domain={["dataMin", "dataMax"]}
            reversed={reversed}
            tickFormatter={truncate}
          />
          <Brush
            dataKey="date"
            height={30}
            travellerWidth={50}
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
          />
          <Tooltip content={<CustomTooltip />} />
          {Array.from(names).map((name) => {
            return (
              <Line
                key={uuidv4()}
                dot={false}
                dataKey={name}
                strokeWidth={4}
                stroke={stc(name)}
                connectNulls={true}
                activeDot={{ stroke: stc(name), strokeWidth: 2, r: 4 }}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
