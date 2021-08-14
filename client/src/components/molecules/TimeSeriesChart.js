import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "../../css/Chart.css";

import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Label,
  Brush,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="text-main-three">
        <p className="label">
          {moment(label).format("DD M YY") + " : " + payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const TimeSeriesChart = (props) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <ResponsiveContainer width="95%" height="95%">
        <LineChart data={props.chartData} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            domain={["auto", "auto"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
            type="number"
          />
          <YAxis
            reversed={props.reversed}
            dataKey="y"
            name="pp"
            domain={["dataMin-0.1", "auto"]}
            tickFormatter={(data) => {
              if (parseInt(data) / 10e8 > 1) {
                return data / 10e8 + "B";
              } else if (parseInt(data) / 10e5 > 1) {
                return data / 10e5 + "M";
              } else if (parseInt(data) / 10e2 > 1) {
                return data / 10e2 + "K";
              } else {
                return data;
              }
            }}
          />
          <Brush
            dataKey="x"
            height={30}
            travellerWidth={50}
            tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            strokeWidth={2}
            dataKey="y"
            type="monotone"
            stroke="#c91a34"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default TimeSeriesChart;
