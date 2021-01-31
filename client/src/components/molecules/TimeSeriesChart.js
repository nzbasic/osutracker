import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Label,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="text-main-one">
        <p className="label">
          {moment(label).format("DD M YY") + " : " + payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const TimeSeriesChart = (props) => {
  const [zoomState, setZoomState] = useState();

  // for desktop
  const handleZoomMouseDown = (e) =>
    e && setZoomState({ ...zoomState, refAreaLeft: e.activeLabel });

  const handleZoomMouseMove = (e) =>
    e &&
    zoomState.refAreaLeft &&
    setZoomState({ ...zoomState, refAreaRight: e.activeLabel });

  const handleZoomMouseUp = (e) => {
    if (
      !(e && zoomState.refAreaLeft && zoomState.refAreaRight) ||
      zoomState.refAreaLeft === zoomState.refAreaRight
    ) {
      setZoomState();
      return;
    }

    const min = Math.min(zoomState.refAreaRight, zoomState.refAreaLeft);
    const max = Math.max(zoomState.refAreaRight, zoomState.refAreaLeft);

    setZoomState({
      ...zoomState,
      xMin: min,
      xMax: max,
      refAreaLeft: undefined,
      refAreaRight: undefined,
    });
  };

  return (
    <ResponsiveContainer width="95%" height="95%">
      <LineChart 
        data={props.chartData} 
        margin={{ top: 25 }}
        onMouseDown={e => handleZoomMouseDown}
        onMouseMove={e => handleZoomMouseMove}
        onMouseUp={e => handleZoomMouseUp}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          domain={["auto", "auto"]}
          name="Date"
          tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
          type="number"
        />
        <YAxis dataKey="y" name="pp" domain={["dataMin-0.1", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <Line strokeWidth={2} dataKey="y" type="monotone" stroke="#c91a34" />
      </LineChart>
    </ResponsiveContainer>
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
