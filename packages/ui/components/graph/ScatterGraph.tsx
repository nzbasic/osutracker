"use client"

import React, { useCallback, useRef, useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { GridRows, GridColumns } from "@visx/grid";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { useTooltip, Tooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { voronoi } from "@visx/voronoi";

interface ScatterGraphProps<T extends object> {
  width?: number;
  height?: number;
  margin: Margin;
  data: T[];
  xAccessor: (obj: T) => any;
  yAccessor: (obj: T) => any;
  xFmt: (obj: any) => any;
}

interface Margin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const fmtYAxisNumber = (num: any) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(num);
};

const fmtTooltipNumber = (num: number) => {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
  }).format(num);
};

const findMin = <T extends Object>(data: T[], accessor: (obj: T) => any) => {
  const axisData = data.map((d) => accessor(d));
  return Math.min(...axisData);
};

const findMax = <T extends Object>(data: T[], accessor: (obj: T) => any) => {
  const axisData = data.map((d) => accessor(d));
  return Math.max(...axisData);
};

const Quartiles = [0.25, 0.5, 0.75, 1];

let tooltipTimeout: number;

export const ScatterGraph = <T extends Object>({
  width = 400,
  height = 400,
  margin,
  data,
  xAccessor,
  yAccessor,
  xFmt,
}: ScatterGraphProps<T>) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xDomain = useMemo(
    () => [findMin(data, xAccessor), findMax(data, xAccessor)],
    [data, xAccessor]
  );
  const yDomain = useMemo(
    () => [findMin(data, yAccessor), findMax(data, yAccessor)],
    [data, yAccessor]
  );

  const xScale = useMemo(() => {
    return scaleLinear({
      domain: xDomain,
      range: [margin.left, innerWidth + margin.left],
      nice: true,
    });
  }, [xDomain, innerWidth, margin]);

  const yScale = useMemo(() => {
    return scaleTime({
      domain: yDomain,
      range: [innerHeight + margin.top, margin.top],
      nice: true,
    });
  }, [yDomain, innerHeight, margin]);

  const colorAccessor = (d: T): number => {
    const range = yDomain[1] - yDomain[0];
    const y = yAccessor(d);
    for (let i = 0; i < Quartiles.length; i++) {
      if (y <= ((yDomain[0] + range) * Quartiles[i])) {
        return Quartiles[i];
      }
    }
    return Quartiles[Quartiles.length - 1];
  };

  const colorScale = scaleOrdinal({
    range: ["#ff8906", "#3da9fc", "#ef4565", "#7f5af0"],
    domain: Quartiles,
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipTop = 0,
    tooltipLeft = 0,
  } = useTooltip<T>();

  const voronoiLayout = useMemo(
    () =>
      voronoi({
        x: (d: T) => xScale(xAccessor(d)) ?? 0,
        y: (d: T) => yScale(yAccessor(d)) ?? 0,
        width,
        height,
      })(data),
    [width, height, data, xAccessor, yAccessor, xScale, yScale]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      if (!svgRef.current) return;

      const point = localPoint(svgRef.current, event);
      if (!point) return;
      const closest = voronoiLayout.find(point.x, point.y, 30);
      if (closest) {
        showTooltip({
          tooltipLeft: xScale(xAccessor(closest.data)),
          tooltipTop: yScale(yAccessor(closest.data)),
          tooltipData: closest.data,
        });
      }
    },
    [xScale, yScale, showTooltip, voronoiLayout, xAccessor, yAccessor]
  );

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 250);
  }, [hideTooltip]);

  return (
    <div className="relative">
      <svg width={width} height={height} ref={svgRef}>
        <rect
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        />
        <AxisLeft
          orientation="left"
          left={margin.left}
          scale={yScale}
          tickFormat={fmtYAxisNumber}
        />
        <AxisBottom
          orientation="bottom"
          top={innerHeight + margin.top}
          scale={xScale}
          tickFormat={xFmt}
        />
        <GridRows
          left={margin.left}
          width={innerWidth}
          stroke="#aeb6be"
          scale={yScale}
        />
        <GridColumns
          height={innerHeight + margin.top}
          stroke="#aeb6be"
          scale={xScale}
        />
        <Group pointerEvents="none">
          {data.map((point, i) => (
            <Circle
              key={`point-${i}`}
              className="dot transition-all"
              cx={xScale(xAccessor(point))}
              cy={yScale(yAccessor(point))}
              r={5}
              fill={colorScale(colorAccessor(point))}
              stroke={
                tooltipData === point
                  ? "black"
                  : colorScale(colorAccessor(point))
              }
            />
          ))}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <Tooltip left={tooltipLeft - 10} top={tooltipTop + 10}>
          <div className="font-semibold text-black">
            {fmtTooltipNumber(yAccessor(tooltipData))}
            {" : "}
            {xFmt(xAccessor(tooltipData))}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

const memoScatterGraph = React.memo(ScatterGraph);
export default memoScatterGraph as typeof ScatterGraph;
