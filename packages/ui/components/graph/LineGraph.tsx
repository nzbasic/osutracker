"use client";

import React from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";

interface LineGraphProps<T extends object> {
  width?: number;
  height?: number;
  data: T[];
  xAccessor: (obj: T) => any;
  yAccessor: (obj: T) => any;
}

const fmtYAxisNumber = (num: any) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(num);
};

function fmtTooltipNumber(num: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(num);
}

function fmtDate(date: number) {
  return new Date(date).toLocaleDateString();
}

const LineGraph = <T extends object>({
  width,
  height,
  data,
  xAccessor,
  yAccessor,
}: LineGraphProps<T>) => {
  return (
    <XYChart height={height} width={width} margin={{ top: 10, bottom: 20, right: 0, left: 45 }}>
      <AnimatedAxis
        orientation="bottom"
        tickFormat={fmtDate}
        animationTrajectory="min"
      />
      <AnimatedAxis
        orientation="left"
        tickFormat={fmtYAxisNumber}
        animationTrajectory="min"
      />
      <AnimatedGrid columns={true} animationTrajectory="min" />
      <AnimatedLineSeries
        dataKey="statsLineChart"
        stroke="red"
        data={data}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
      />
      <Tooltip
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData }) => (
          <div>
            {fmtDate(xAccessor(tooltipData?.nearestDatum?.datum as T))}
            {" : "}
            {fmtTooltipNumber(yAccessor(tooltipData?.nearestDatum?.datum as T))}
          </div>
        )}
      />
    </XYChart>
  );
};

const memoLineGraph = React.memo(LineGraph);
export default memoLineGraph as typeof LineGraph;
