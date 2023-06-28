"use client";

import React from "react";
import { ResponsiveContainer } from "../util";
import { StatsLineGraph } from "../internal";
import { dropdownOptions } from "../util/user-stat-options";
import { NextUserStatV2 } from "../../tracking/user/temp-interfaces";
import PillSelect from "../../util/PillSelect";
import { get } from "api-client";

interface StatsLineGraphWithDropdownProps {
    data: Awaited<ReturnType<typeof get<'v2/user/:id/stats'>>>;
}

function StatsLineGraphWithDropdown({ data }: StatsLineGraphWithDropdownProps) {
    const [selectedStat, setSelectedStat] = React.useState(dropdownOptions[0]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <PillSelect
                    options={dropdownOptions}
                    selected={selectedStat}
                    setSelected={(option) => setSelectedStat(option)}
                />
            </div>

            <ResponsiveContainer className="bg-primary-dark h-72 rounded-2xl p-6 text-white md:h-96">
                <StatsLineGraph data={data} selectedStat={selectedStat.value} />
            </ResponsiveContainer>
        </div>
    );
}

export default StatsLineGraphWithDropdown;
