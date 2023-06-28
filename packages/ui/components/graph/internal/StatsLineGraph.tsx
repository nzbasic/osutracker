"use client";

import { DataProvider } from "@visx/xychart";
import React, { useMemo } from "react";
import { NextUserStatV2 } from "../../tracking";
import Brush from "../util/Brush";
import LineGraph from "./LineGraph";
import { useDebounce } from "react-use-custom-hooks";

import { Stat } from "../util/user-stat-options";
import { get } from "api-client";
const flippedYAxisStats: Stat[] = ["rank", "countryRank"];

type StatsData = Awaited<ReturnType<typeof get<'v2/user/:id/stats'>>>;

interface StatsLineGraphProps {
    width?: number;
    height?: number;
    selectedStat: Stat;
    data: StatsData;
}

const dataHasChanged = (prev: NextUserStatV2, curr: NextUserStatV2) => {
    return (
        prev.acc !== curr.acc ||
        prev.countryRank !== curr.countryRank ||
        prev.farm !== curr.farm ||
        prev.plays !== curr.plays ||
        prev.pp !== curr.pp ||
        prev.range !== curr.range ||
        prev.score !== curr.score
    );
};

function StatsLineGraph({
    width = 0,
    height = 0,
    data,
    selectedStat,
}: StatsLineGraphProps) {
    const [brushPoints, setBrushPoints] = React.useState([0, data.length - 1]);

    React.useEffect(() => {
        // update brushPoints
        const filtered = data.filter((d) => d[selectedStat] != undefined);
        setBrushPoints([0, filtered.length - 1]);
    }, [data, selectedStat]);

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
    }, [data, selectedStat]);

    const brushedData = useMemo(() => {
        return formattedData.slice(brushPoints[0], brushPoints[1] + 1);
    }, [formattedData, brushPoints]);

    const debouncedBrushedData = useDebounce(brushedData, 150);

    const yDomain = useMemo(() => {
        const selectedStatData: number[] = debouncedBrushedData
            .map((d) => d[selectedStat])
            .filter((d): d is number => d !== undefined);
        const min = Math.min(...selectedStatData);
        const max = Math.max(...selectedStatData);
        const domain = flippedYAxisStats.includes(selectedStat)
            ? [max, min]
            : [min, max];
        return domain;
    }, [debouncedBrushedData, selectedStat]);

    const xDomain = useMemo(() => {
        const filteredData = debouncedBrushedData.filter(
            (d) => d[selectedStat] != undefined
        );
        const dateData = filteredData.map((d) => new Date(d.date).getTime());
        const min = Math.min(...dateData);
        const max = Math.max(...dateData);
        return [min, max];
    }, [debouncedBrushedData, selectedStat]);

    const bottomHeight = 50;
    const topHeight =
        (width ?? 0) > 768 ? (height ?? 0) - bottomHeight : height;

    const xAccessor = React.useCallback(
        (d: StatsData[number]) => new Date(d?.date).getTime() ?? 0,
        []
    );
    const yAccessor = React.useCallback(
        (d: StatsData[number]) => d[selectedStat],
        [selectedStat]
    );

    return (
        <div>
            <DataProvider
                xScale={{ type: "time", domain: xDomain, range: [0, width] }}
                yScale={{
                    // @ts-ignore
                    type: "quantized",
                    domain: yDomain,
                }}
            >
                <LineGraph
                    width={width}
                    height={topHeight}
                    data={debouncedBrushedData}
                    xAccessor={xAccessor}
                    yAccessor={yAccessor}
                    reversed={flippedYAxisStats.includes(selectedStat)}
                />
            </DataProvider>
            <Brush
                height={bottomHeight}
                width={width + 10}
                data={formattedData}
                xAccessor={xAccessor}
                yAccessor={yAccessor}
                onBrushChange={setBrushPoints}
                reversed={flippedYAxisStats.includes(selectedStat)}
            />
        </div>
    );
}

export default StatsLineGraph;
