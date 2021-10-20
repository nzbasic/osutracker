import { useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ct from "countries-and-timezones";
import utcLocal from "utc-local";

export const ScatterGraph = ({ data }) => {
  useEffect(() => {
    const country = ct.getCountry("NZ");
    const timezone = country.timezones[0];

    for (const point of data) {
      const date = new Date(point.date + "+00");
      console.log(point.date + "+00");
      const time = date.getHours() * 100 + date.getMinutes();
      point.date = time;
    }

    console.log(data);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="date"
          domain={[0, 2400]}
          interval={0}
          ticks={[0, 600, 1200, 1800, 2400]}
          tickFormatter={(time) => {
            let string = time.toString();
            while (string.length < 4) {
              string = "0" + string;
            }
            return string;
          }}
          name="Time"
          scale="linear"
          unit="HRS"
        />
        <YAxis
          type="number"
          dataKey="pp"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(pp) => {
            return parseInt(pp.toString());
          }}
          name="pp"
          unit="pp"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }}  />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
