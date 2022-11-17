"use client";

import { DataProvider } from "@visx/xychart";
import React, { useMemo } from "react";
import { NextUserStatV2 } from "../../tracking";
import LineGraph from "../LineGraph";

import { dropdownOptions, Stat } from "./items";
const flippedYAxisStats: Stat[] = ["rank", "countryRank"];

interface StatsLineGraphProps {
  selectedStat: Stat;
  data: NextUserStatV2[];
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
}

export const StatsLineGraph = ({ data, selectedStat }: StatsLineGraphProps) => {  
  // x domain (time)
  const makeTimeDomain = () => {
    // handling optional NextUserStatV2 fields - values of d[stat] which are undefined should
    // not be included time-wise, as they weren't being recorded yet
    const filteredData: NextUserStatV2[] = data.filter((d) => d[selectedStat] != undefined);
    const dateData = filteredData.map((d) => d.date);
    const min = Math.min(...dateData);
    const max = Math.max(...dateData);
    return [min, max];
  };

  // y domain (selected stat)
  const makeYDomain = () => {
    const selectedStatData: number[] = data
      .map((d) => d[selectedStat])
      .filter((d): d is number => d !== undefined);
    const min = Math.min(...selectedStatData);
    const max = Math.max(...selectedStatData);
    const domain = flippedYAxisStats.includes(selectedStat) ? [max, min] : [min, max];
    return domain;
  };

  const deduplicated = useMemo(() => {
    const sorted = data.sort((a, b) => a.date - b.date)
    const newData: NextUserStatV2[] = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const curr = sorted[i];
      const prev = sorted[i-1];
      if (dataHasChanged(prev, curr)) {
        newData.push(curr)
      }
    }
    return newData;
  }, [data])

  return (
    <DataProvider
      xScale={{ type: "time", domain: makeTimeDomain() }}
      yScale={{
        // @ts-ignore
        type: "quantized",
        domain: makeYDomain(),
      }}
    >
      <LineGraph
        data={deduplicated} 
        xAccessor={(d: NextUserStatV2) => d?.date ?? 0} 
        yAccessor={(d: NextUserStatV2) => d[selectedStat]} 
      />
    </DataProvider>
  );
};
