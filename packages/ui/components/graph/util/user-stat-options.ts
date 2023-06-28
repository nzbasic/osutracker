import { NextUserStatV2 } from "../../tracking";

export type Stat = keyof Omit<NextUserStatV2, "playerId" | "player" | "date">;

interface StatOption {
    value: Stat;
    label: string;
}

export const dropdownOptions: StatOption[] = [
    {
        value: "pp",
        label: "Performance",
    },
    {
        value: "rank",
        label: "Global Rank",
    },
    {
        value: "acc",
        label: "Accuracy",
    },
    {
        value: "plays",
        label: "Play Count",
    },
    {
        value: "farm",
        label: "Farm",
    },
    {
        value: "range",
        label: "Range",
    },
    {
        value: "score",
        label: "Score",
    },
    {
        value: "countryRank",
        label: "Country Rank",
    },
];
