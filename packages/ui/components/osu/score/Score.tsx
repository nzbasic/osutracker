import Mods from "./Mods";
import Number from "./Number";
import Rank from "./Rank";
import Link from "next/link";
import { truncate } from "lodash";

interface ScoreProps {
    rank: string;
    setId: number;
    id: number;
    title: string;
    artist: string;
    difficulty: string;
    mods: string[];
    acc: number;
    pp: number;
    count50: number;
    count100: number;
    count300: number;
    countMiss: number;
    number?: number;
}

function Score({
    rank,
    setId,
    id,
    title,
    artist,
    difficulty,
    mods,
    acc,
    pp,
    count50,
    count100,
    count300,
    countMiss,
    number,
}: ScoreProps) {
    return (
        <div className="flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-white p-2 font-medium">
            <div className="flex items-center gap-2 text-xs md:text-base">
                {number && <Number number={number} />}
                <Rank letter={rank} />
                <div className="flex max-w-lg flex-col truncate">
                    <Link
                        href={`https://osu.ppy.sh/beatmapsets/${setId}/#osu/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all hover:text-blue-500"
                    >
                        <span className="hidden truncate text-sm md:block">
                            {artist} - {title}
                        </span>
                        <span className="text-xs md:hidden">
                            {truncate(`${artist} - ${title}`, { length: 25 })}
                        </span>
                    </Link>
                    <span className="leading-0 text-xs">{difficulty}</span>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:gap-4">
                <Mods mods={mods} />
                <span className="hidden w-14 md:block">
                    {acc === 1 ? 100 : (acc * 100).toFixed(2)}%
                </span>
                <span className="w-10 text-xs md:w-14">{Math.round(pp)}pp</span>
            </div>
        </div>
    );
}

export default Score;
