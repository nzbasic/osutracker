"use client";

import React from "react";
import { ResponsiveContainer } from "../ResponsiveContainer";
import { StatsLineGraph } from "./Graph";
import { dropdownOptions } from "./items";
import { NextUserStatV2 } from "../../tracking/user/temp-interfaces";
import { Dropdown } from "../../util/Dropdown";

interface StatsLineGraphWithDropdownProps {
  data: NextUserStatV2[];
}

export const StatsLineGraphWithDropdown = ({
  data,
}: StatsLineGraphWithDropdownProps) => {
  const [selectedStat, setSelectedStat] = React.useState(dropdownOptions[0]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-2 border-b p-2">
        <span className="font-semibold">Graph</span>
        <Dropdown
          options={dropdownOptions}
          selected={selectedStat}
          setSelected={setSelectedStat}
          className="w-52"
        />
      </div>
      <ResponsiveContainer className="h-96 w-full">
        <StatsLineGraph data={data} selectedStat={selectedStat.value} />
      </ResponsiveContainer>
    </div>
  );
}
