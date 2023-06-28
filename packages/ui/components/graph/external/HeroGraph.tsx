"use client";

import React, { useMemo } from "react";
import { Stat } from "../util/user-stat-options";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed, Line, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { Annotation, Connector, HtmlLabel } from "@visx/annotation";
import { get } from "api-client";
const flippedYAxisStats: Stat[] = ["rank", "countryRank"];

type StatsData = Awaited<ReturnType<typeof get<'v2/user/:id/stats'>>>;

interface StatsLineGraphProps {
    width?: number;
    height?: number;
    data: StatsData;
}

const selectedStat = "pp";

function HeroGraph({ width = 0, height = 0, data }: StatsLineGraphProps) {
    const formattedData = useMemo(() => {
        const withoutSameDay = data.filter((d, i) => {
            if (i === 0) return true;
            const prev = data[i - 1];

            const dayPrev = new Date(prev.date).getDate();
            const dayCurr = new Date(d.date).getDate();

            return dayPrev !== dayCurr;
        });

        const sorted = withoutSameDay.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const filtered = sorted.filter((d) => d[selectedStat] != undefined);
        return filtered;
    }, [data]);

    const yDomain = useMemo(() => {
        const selectedStatData: number[] = formattedData
            .map((d) => d[selectedStat])
            .filter((d): d is number => d !== undefined);
        const min = Math.min(...selectedStatData);
        const max = Math.max(...selectedStatData);
        const domain = flippedYAxisStats.includes(selectedStat)
            ? [max, min]
            : [min, max];
        return domain;
    }, [formattedData]);

    const xDomain = useMemo(() => {
        const filteredData = formattedData.filter(
            (d) => d[selectedStat] != undefined
        );
        const dateData = filteredData.map((d) => new Date(d.date).getTime());
        const min = Math.min(...dateData);
        const max = Math.max(...dateData);
        return [min, max];
    }, [formattedData]);

    const xAccessor = React.useCallback(
        (d: StatsData[number]) => new Date(d?.date).getTime() ?? 0,
        []
    );
    const yAccessor = React.useCallback(
        (d: StatsData[number]) => d[selectedStat],
        []
    );

    const xScale = scaleTime({
        domain: xDomain,
        range: [0, width - 2],
    });

    const yScale = scaleLinear({
        domain: yDomain,
        range: [height - 2, 0],
    });

    const x = (d: StatsData[number]) => xScale(xAccessor(d));
    const y = (d: StatsData[number]) => yScale(yAccessor(d));

    const lastPoint = formattedData[formattedData.length - 1];

    const point1 = data[44]; // 24
    const point2 = data[446];

    if (width === 0) return;

    return (
        <div className="absolute">
            <svg width={width} height={height}>
                <Group>
                    <LinePath
                        data={formattedData}
                        x={x}
                        y={y}
                        className="stroke-primary"
                        strokeWidth={4}
                    />

                    <LinearGradient
                        id="area-gradient"
                        from={"#2563EB"}
                        to={"#2563EB"}
                        fromOpacity={1}
                        toOpacity={0}
                    />

                    <AreaClosed
                        data={data}
                        x={x}
                        y={y}
                        yScale={yScale}
                        fill="url(#area-gradient)"
                        clipPath="url(#rectClip)"
                        // stroke="#f6af3b"
                        strokeWidth={0}
                    />

                    <Annotation
                        x={x(data[44])}
                        y={y(data[44])}
                        dx={-70}
                        dy={-50}
                    >
                        {/* <CircleSubject className="stroke-primary-dark" /> */}
                        <HtmlLabel showAnchorLine={false}>
                            <div className="bg-primary-dark text-primary-light flex w-44 flex-col gap-1 rounded-2xl px-6 py-4">
                                <div className="flex flex-col">
                                    <h4>Zoomer</h4>
                                    {/* <Image src="https://a.ppy.sh/6600930" className="rounded-lg border border-neutral-500" alt="Zoomer" width={50} height={50} /> */}
                                </div>

                                <h5 className="font-bold text-emerald-400">
                                    +{(point1.pp - point2.pp).toFixed(0)}pp (+
                                    {(
                                        (point1.pp / point2.pp) * 100 -
                                        100
                                    ).toFixed(0)}
                                    %)
                                </h5>
                            </div>
                        </HtmlLabel>
                        <Connector
                            type="elbow"
                            className="stroke-primary-dark"
                            pathProps={{ strokeWidth: 4 }}
                        />
                    </Annotation>

                    {point1 && point2 && (
                        <Line
                            from={{
                                x: x(point1),
                                y: yScale(yAccessor(point1)),
                            }}
                            to={{ x: x(point2), y: yScale(yAccessor(point2)) }}
                            className="stroke-primary-dark"
                            strokeWidth={4}
                            strokeDasharray="15,15"
                        />
                    )}

                    <circle
                        cx={x(point1)}
                        cy={y(point1)}
                        r={8}
                        className="fill-primary-dark"
                    />
                    <circle
                        cx={x(point2)}
                        cy={y(point2)}
                        r={8}
                        className="fill-primary-dark"
                    />

                    {/* This cuts the above areaseries where the user has selected */}
                    <clipPath id="rectClip">
                        <rect
                            x={x(point2)}
                            y="0"
                            width={x(point1) - x(point2)}
                            height={height}
                        />
                    </clipPath>
                </Group>
            </svg>
            {width && width > 0 && (
                <>
                    <div
                        style={{
                            left: x(lastPoint) - 8,
                            top: y(lastPoint) - 8,
                        }}
                        className="bg-primary absolute h-[16px] w-[16px] animate-ping rounded-full"
                    />
                    <div
                        style={{
                            left: x(lastPoint) - 8,
                            top: y(lastPoint) - 8,
                        }}
                        className="bg-primary absolute h-[16px] w-[16px] rounded-full"
                    />
                </>
            )}
        </div>
    );
}

export default HeroGraph;
