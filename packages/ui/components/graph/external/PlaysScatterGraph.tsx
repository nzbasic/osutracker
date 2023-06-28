"use client";

import React from "react";
import { ResponsiveContainer } from "../util";
import { proxy } from "database";
import ScatterGraph from "../internal/ScatterGraph";
import { default as Dropdown, DropdownOption } from "../../util/Dropdown";

export type XAccessor = "date" | "hour";

export const dropdownOptions: DropdownOption[] = [
    {
        value: "date",
        label: "By Date",
    },
    {
        value: "hour",
        label: "By Hour",
    },
];

interface PlaysScatterGraphProps {
    data: proxy.Score[];
}

const getXAccessor = (accessorType: XAccessor) => {
    switch (accessorType) {
        case "date":
            return (d: proxy.Score) => new Date(d.created_at);
        case "hour":
            return (d: proxy.Score) => {
                const date = new Date(d.created_at);
                let hours = (date.getHours() % 24) * 100; // +tz
                if (hours < 0) {
                    hours += 2400;
                }
                const minutes = date.getMinutes();
                return hours + minutes;
            };
    }
};

const getXFmt = (accessorType: XAccessor) => {
    switch (accessorType) {
        case "date":
            return (date: any) => new Date(date).toLocaleDateString();
        case "hour":
            return (time: any) => {
                const hours = Math.floor(time / 100);
                const period = hours >= 12 ? "PM" : "AM";
                const hour = hours % 12;
                const minute = String(time % 100).padStart(2, "0");
                return `${hour === 0 ? 12 : hour}:${minute} ${
                    hours === 24 ? "AM" : period
                }`;
            };
    }
};

const yAccessor = (d: proxy.Score) => d.pp;

function PlaysScatterGraph({ data }: PlaysScatterGraphProps) {
    const [xDisplay, setXDisplay] = React.useState(dropdownOptions[0]);

    return (
        <div className="flex flex-col">
            <div className="border-b p-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold">Top Plays</span>
                    <div className="w-32">
                        <Dropdown
                            options={dropdownOptions}
                            selected={xDisplay}
                            setSelected={setXDisplay}
                        />
                    </div>
                </div>
            </div>
            <ResponsiveContainer className="mt-2 h-96 w-full">
                <ScatterGraph
                    data={data}
                    xAccessor={getXAccessor(xDisplay.value)}
                    yAccessor={yAccessor}
                    xFmt={getXFmt(xDisplay.value)}
                    margin={{ top: 30, left: 60, right: 40, bottom: 40 }}
                />
            </ResponsiveContainer>
        </div>
    );
}

export default PlaysScatterGraph;
