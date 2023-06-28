"use client";

import React from "react";
import {
    XYChart,
    Tooltip,
    DataContext,
    LineSeries,
    AnimatedAxis,
    AreaSeries,
    EventHandlerParams,
} from "@visx/xychart";
import { LinearGradient } from "@visx/gradient";
import { Line } from "@visx/shape";
import HighlightedPoint from "../util/HighlightedPoint";
import { DateTime } from "luxon";
import { get } from "api-client";

type StatsData = Awaited<ReturnType<typeof get<'v2/user/:id/stats'>>>;

interface LineGraphProps<T extends object> {
    width?: number;
    height?: number;
    data: T[];
    reversed?: boolean;
    xAccessor: (obj: T) => any;
    yAccessor: (obj: T) => any;
}

function fmtTooltipNumber(num: number) {
    return new Intl.NumberFormat("en", {
        maximumFractionDigits: 2,
    }).format(num);
}

function fmtDifference(num: number) {
    return new Intl.NumberFormat("en", {
        maximumFractionDigits: 2,
        signDisplay: "always",
    }).format(num);
}

function fmtDate(date: number) {
    return new Date(date).toLocaleDateString();
}

type Points<T> =
    | [EventHandlerParams<T>, EventHandlerParams<T> | null]
    | undefined;

const LineGraph = <T extends object>({
    width = 0,
    height = 0,
    data,
    reversed,
    xAccessor,
    yAccessor,
}: LineGraphProps<T>) => {
    // @ts-ignore
    const { yScale, xScale } = React.useContext(DataContext);
    const [highlightedPoints, setHighlightedPoints] =
        React.useState<Points<T> | undefined>();

    const handleMouseDown = React.useCallback(
        (point: EventHandlerParams<T>) => {
            if (highlightedPoints?.[0]) return;
            setHighlightedPoints([point, null]);
        },
        [highlightedPoints]
    );

    const handleMouseMove = React.useCallback(
        (point: EventHandlerParams<T>) => {
            if (!highlightedPoints) return;
            if (point.key === "undefined") return;
            setHighlightedPoints([highlightedPoints?.[0], point]);
        },
        [highlightedPoints]
    );

    const handleMouseUp = React.useCallback((point: EventHandlerParams<T>) => {
        setHighlightedPoints(undefined);
    }, []);

    const [
        point1,
        point2,
        difference,
        percentage,
        negative,
        avgDifferenceDay,
        avgPercentageDay,
    ] = React.useMemo(() => {
        if (!highlightedPoints) return [null, null, 0, 0, 0, 0, 0];
        const copy = [...highlightedPoints].sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0));
        const point1 = copy[0];
        const point2 = copy[1];

        if (!(point1 && point2)) return [null, null, 0, 0, 0, 0, 0];

        const difference = yAccessor(point2.datum) - yAccessor(point1.datum);
        const percentage = difference / yAccessor(point1.datum);

        const days = point2.index - point1.index;
        const avgDifferenceDay = difference / days;
        const avgPercentageDay = percentage / days;

        const negative = reversed ? difference > 0 : difference < 0;

        return [
            point1,
            point2,
            difference,
            percentage,
            negative,
            avgDifferenceDay,
            avgPercentageDay,
        ];
    }, [highlightedPoints, yAccessor, reversed]);

    return (
        <XYChart
            height={height}
            width={width}
            margin={{ left: 1, right: 1, top: 1, bottom: 30 }}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
        >
            <AnimatedAxis
                orientation="bottom"
                stroke="pink"
                tickStroke="pink"
                strokeWidth={2}
                tickLineProps={{ strokeWidth: 2 }}
                tickLabelProps={(props) => ({
                    ...props,
                    stroke: "white",
                    fontWeight: 100,
                })}
                tickFormat={(value) =>
                    DateTime.fromJSDate(value).toFormat("LLL yy")
                }
                numTicks={6}
                axisClassName="select-none"
            />

            <LineSeries
                dataKey="statsLineChart"
                // stroke="#F6CE4E"
                className="stroke-secondary"
                data={data}
                xAccessor={xAccessor}
                yAccessor={yAccessor}
            />

            <LinearGradient
                id="area-gradient"
                from={negative ? "red" : "green"}
                to={negative ? "red" : "green"}
                fromOpacity={1}
                toOpacity={0}
            />

            <AreaSeries
                dataKey="area"
                data={data}
                xAccessor={xAccessor}
                yAccessor={yAccessor}
                fill="url(#area-gradient)"
                enableEvents={false}
                clipPath="url(#rectClip)"
                lineProps={{ stroke: "#f6af3b" }}
            />

            {/* This cuts the above areaseries where the user has selected */}
            <clipPath id="rectClip">
                <rect
                    x={point1?.svgPoint?.x ?? 0}
                    y="0"
                    width={
                        (point2?.svgPoint?.x ?? 0) - (point1?.svgPoint?.x ?? 0)
                    }
                    height={height}
                />
            </clipPath>

            {point1 && point2 && (
                <Line
                    from={{
                        x: point1?.svgPoint?.x,
                        y: yScale ? (yScale(yAccessor(point1.datum)) as number ?? 0) : 0,
                    }}
                    to={{
                        x: point2.svgPoint?.x,
                        y: yScale ? (yScale(yAccessor(point2.datum)) as number ?? 0) : 0,
                    }}
                    fill="white"
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                />
            )}

            {point1 && (
                <HighlightedPoint
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    point={point1}
                />
            )}

            {point2 && (
                <HighlightedPoint
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    point={point2}
                />
            )}

            <Tooltip
                showVerticalCrosshair
                renderGlyph={({ x, y }) => (
                    <circle
                        cx={x}
                        cy={y}
                        r={4}
                        stroke="#f6af3b"
                        fill="#f6af3b"
                    />
                )}
                showSeriesGlyphs
                renderTooltip={({ tooltipData }) => (
                    <div className="flex flex-col gap-2">
                        {!(point1 && point2) && (
                            <div>
                                {fmtDate(
                                    xAccessor(
                                        tooltipData?.nearestDatum?.datum as T
                                    )
                                )}
                                {" : "}
                                {fmtTooltipNumber(
                                    yAccessor(
                                        tooltipData?.nearestDatum?.datum as T
                                    )
                                )}
                            </div>
                        )}

                        {point1 && point2 && (
                            <div>
                                {fmtDate(xAccessor(point1?.datum as T))}
                                {" : "}
                                {fmtTooltipNumber(
                                    yAccessor(point1?.datum as T)
                                )}
                                <br />
                                {fmtDate(xAccessor(point2?.datum as T))}
                                {" : "}
                                {fmtTooltipNumber(
                                    yAccessor(point2?.datum as T)
                                )}
                                <br />
                                <div
                                    style={{
                                        color: negative ? "red" : "green",
                                    }}
                                >
                                    {fmtDifference(difference)} (
                                    {fmtDifference(percentage * 100)}%)
                                </div>
                                <br />
                                Per Day
                                <div
                                    style={{
                                        color: negative ? "red" : "green",
                                    }}
                                >
                                    {fmtDifference(avgDifferenceDay)} (
                                    {fmtDifference(avgPercentageDay * 100)}%)
                                </div>
                            </div>
                        )}
                    </div>
                )}
            />
        </XYChart>
    );
};

const memoLineGraph = React.memo(LineGraph);
export default memoLineGraph as typeof LineGraph;
