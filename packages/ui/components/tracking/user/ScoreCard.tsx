import Link from "next/link";
import { ScoreV2Dto } from "./temp-interfaces";
import classNames from "classnames";
import { fmtInt, fmtFloat, fmtBeatmapTitle } from "../../util/fmt-strings";
import Mods from '../../osu/score/Mods';

interface ScoreCardProps {
  score: ScoreV2Dto;
}

export const ScoreCard = ({ score }: ScoreCardProps) => {
  return (
    <Link
      href={`https://osu.ppy.sh/beatmaps/${score.beatmap.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center rounded gap-3 p-2 text-gray-800 bg-gray-50 hover:bg-blue-500 hover:text-white transition-colors"
    >
      <div className="w-full">
        <div className="flex gap-1">
          <span>{fmtBeatmapTitle(score.beatmap.title)}</span>
          <span className="text-sm">{`by ${score.beatmap.artist}`}</span>
        </div>
        <div>{`[${score.beatmap.difficulty}]`}</div>
      </div>
      <div className="shrink-0 grid grid-cols-3 gap-x-2">
        <Mods mods={score.mods} />
        <span className="w-16">{`${fmtFloat(score.acc, 2)}%`}</span>
        <span className="w-16">{`${fmtInt(score.pp)}pp`}</span>
      </div>
    </Link>
  );
};
