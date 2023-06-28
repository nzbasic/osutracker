"use client";

import { ScoreList } from "ui";
import { Calendar } from "../graph";
import { ResponsiveContainer } from "ui/components/graph/util";
import { get } from 'api-client';
import React from "react";
import { proxy } from "database";

type Props = {
    playDateCount: Record<string, proxy.ScoreDocument[]>
    plays: Awaited<ReturnType<typeof get<"v2/user/:id/top">>>;
};

function ScoresWithHeatmap({ playDateCount, plays }: Props) {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    return (
        <>
            <div className="flex flex-col items-start gap-4">
                <h3>Top Play Heatmap</h3>

                <ResponsiveContainer className="w-full">
                    <Calendar data={playDateCount} />
                </ResponsiveContainer>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
                <h3>Top Plays</h3>
                <ScoreList
                    scores={plays.sort((a, b) => (b?.pp ?? 0) - (a?.pp ?? 0))}
                />
            </div>
        </>
    );
}

export default ScoresWithHeatmap;
