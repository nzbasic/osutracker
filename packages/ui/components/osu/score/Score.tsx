import Mods from "./Mods";
import Number from "./Number";
import { Rank } from "./Rank";
import Link from "next/link";

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
  number: number;
}

export const Score = ({
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
}: ScoreProps) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-gray-50 p-2 font-medium">
      <div className="flex items-center gap-2">
        <Number number={number} />
        <Rank letter={rank} />
        <div className="flex max-w-lg flex-col truncate">
          <Link
            href={`https://osu.ppy.sh/beatmapsets/${setId}/#osu/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-all"
          >
            <span className="truncate text-sm">
              {artist} - {title}
            </span>
          </Link>
          <span className="leading-0 text-xs">{difficulty}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Mods mods={mods} />
        <span className="w-14">
          {acc === 1 ? 100 : (acc * 100).toFixed(2)}%
        </span>
        <span className="w-14">{Math.round(pp)}pp</span>
      </div>
    </div>
  );
};
