"use client";

import React, { useState } from "react";
import { timeDays, timeMonths, timeWeek, timeYear } from "d3-time";
import { Group } from "@visx/group";
import { timeFormat } from "d3-time-format";
import { scaleLinear } from "@visx/scale";
import PillSelect from "ui/components/util/PillSelect";
import max from "lodash/max";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { proxy } from "database";
import { Score } from "ui";

const formatDay = timeFormat("%Y-%m-%d");

type Props = {
    data: { [day: string]: proxy.ScoreDocument[] };
    width?: number;
    height?: number;
};

function Calendar({ data, width = 0 }: Props) {
    const router = useRouter();

    const years = React.useMemo(
        () =>
            Object.entries(data).reduce((acc, [day, value]) => {
                const year = day.split("-")[0];
                if (acc[year] == null) {
                    acc[year] = 0;
                }
                acc[year] += value.length;
                return acc;
            }, {} as Record<string, number>),
        [data]
    );

    const color = React.useMemo(
        () =>
            scaleLinear()
                .domain([0, max(Object.values(data).map((d) => d.length)) ?? 0])
                .range(["#C4DBFB", "#3762E3"]),
        [data]
    );

    const outlineWidth = width > 768 ? 4 : 2;
    const cellWidth = (width - outlineWidth) / 53;
    const height = cellWidth * 7;

    const pathMonth = React.useCallback(
        (t0: any) => {
            const d0 = t0.getDay();
            const w0 = timeWeek.count(timeYear(t0), t0);
            const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
            const d1 = t1.getDay();
            const w1 = timeWeek.count(timeYear(t1), t1);

            return `
            M${(w0 + 1) * cellWidth + outlineWidth / 2},${d0 * cellWidth}
            H${w0 * cellWidth + outlineWidth / 2} V${7 * cellWidth}
            H${w1 * cellWidth + outlineWidth / 2} V${(d1 + 1) * cellWidth}
            H${(w1 + 1) * cellWidth + outlineWidth / 2} V0
            H${(w0 + 1) * cellWidth + outlineWidth / 2}Z
        `;
        },
        [cellWidth]
    );

    const options = React.useMemo(
        () =>
            Object.entries(years)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, count]) => ({ label: year, value: year, count })),
        [years]
    );

    // start with latest year in years selected
    const [selected, setSelected] = useState(options[0]);

    const firstDayOfYear = new Date(Number(selected.value), 0, 1);
    const lastDayOfYear = new Date(Number(selected.value) + 1, 0, 1);
    const yearDays = timeDays(firstDayOfYear, lastDayOfYear);
    const yearMonths = timeMonths(firstDayOfYear, lastDayOfYear);

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<{ date: string, formattedDate: string, value: proxy.ScoreDocument[] }>();

    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        detectBounds: true,
        scroll: true,
    });

    const handleMouseOver = React.useCallback(
        (event: React.MouseEvent<SVGGElement, MouseEvent>, date: string, value: proxy.ScoreDocument[]) => {
            const target = event.target as SVGGElement;
            if (target.ownerSVGElement) {
                const coords = localPoint(target.ownerSVGElement, event);
                showTooltip({
                    tooltipLeft: coords?.x,
                    tooltipTop: coords?.y,
                    tooltipData: {
                        // convert to Month Date
                        date,
                        formattedDate: new Date(date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                        }),
                        value,
                    },
                });
            }
        },
        [showTooltip]
    );

    return (
        <div className="flex h-full w-full flex-col gap-2">
            <PillSelect
                options={options}
                selected={selected}
                setSelected={setSelected}
            />
            <svg
                ref={containerRef}
                width={width}
                height={height + outlineWidth}
                key={`year-${selected.value}`}
            >
                <Group
                    transform={`translate(${
                        (width - cellWidth * 53) / 2 - outlineWidth / 2
                    },${height - cellWidth * 7 - 1})`}
                >
                    <Group top={1} className="bg-black">
                        {yearDays.map((day) => {
                            const dayString = formatDay(day);
                            const value = data[dayString];

                            return (
                                <Group
                                    onMouseOver={(event) =>
                                        handleMouseOver(event, dayString, value)
                                    }
                                    onMouseOut={hideTooltip}
                                >
                                    <rect
                                        width={cellWidth}
                                        height={cellWidth}
                                        className={cn({
                                            "fill-white":
                                                tooltipData?.date !== dayString,
                                            "fill-primary":
                                                tooltipData?.date === dayString,
                                        })}
                                        x={
                                            timeWeek.count(timeYear(day), day) *
                                                cellWidth +
                                            outlineWidth / 2
                                        }
                                        y={
                                            day.getDay() * cellWidth +
                                            outlineWidth / 2
                                        }
                                        key={`day-bg-${dayString}`}
                                        onClick={() =>
                                            router.push("?date=" + dayString)
                                        }
                                    />
                                    <rect
                                        fill={(color(value?.length) as string) ?? "#f1f1f1"}
                                        className="hover:brightness-95"
                                        width={cellWidth - outlineWidth}
                                        height={cellWidth - outlineWidth}
                                        x={
                                            timeWeek.count(timeYear(day), day) *
                                                cellWidth +
                                            outlineWidth
                                        }
                                        y={
                                            day.getDay() * cellWidth +
                                            outlineWidth
                                        }
                                        key={`day-rect-${dayString}`}
                                    />
                                </Group>
                            );
                        })}
                    </Group>

                    <Group
                        fill="none"
                        style={{ strokeWidth: outlineWidth }}
                        className="stroke-secondary"
                        top={outlineWidth / 2 + 1}
                    >
                        {yearMonths.map((firstOfMonth) => (
                            <path
                                d={pathMonth(firstOfMonth)}
                                key={`month-path-${formatDay(firstOfMonth)}`}
                            />
                        ))}
                    </Group>
                </Group>
            </svg>
            {tooltipOpen && (
                <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    className="flex flex-col gap-4 !p-4 !text-black"
                    detectBounds={true}
                >
                    <span>{tooltipData?.formattedDate}</span>

                    {/* {tooltipData?.value?.length > 0 && (
                        <div className="flex min-w-[32rem] flex-col gap-2">
                            {tooltipData.value?.map((score) => (
                                <Score
                                    key={score.id}
                                    rank={score.rank}
                                    setId={score.beatmap.beatmapset_id}
                                    id={score.beatmap.id}
                                    title={score.beatmapset.title}
                                    artist={score.beatmapset.artist}
                                    difficulty={score.beatmap.version}
                                    mods={score.mods}
                                    acc={score.accuracy}
                                    pp={score.pp ?? 0}
                                    countMiss={score.statistics.count_miss}
                                    count300={score.statistics.count_300}
                                    count100={score.statistics.count_100}
                                    count50={score.statistics.count_50}
                                />
                            ))}
                        </div>
                    )} */}
                </TooltipInPortal>
            )}
        </div>
    );
}

const memoCalendar = React.memo(Calendar);
export default memoCalendar as unknown as typeof Calendar;
