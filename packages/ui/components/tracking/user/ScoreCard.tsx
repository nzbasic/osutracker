import Link from "next/link";
import { ScoreV2Dto } from "./temp-interfaces";
import classNames from "classnames";
import { fmtInt, fmtFloat, fmtBeatmapTitle } from "../../util/fmt-strings";

interface ScoreCardProps {
  score: ScoreV2Dto;
}

export const ScoreCard = ({ score }: ScoreCardProps) => {
  return (
    <Link
      href={`https://osu.ppy.sh/beatmaps/${score.beatmap.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "flex gap-3 p-2",
        "rounded border border-edge transition-all hover:border-blue-500"
      )}
    >
      <div>
        <div className="flex gap-1 truncate">
          <span>{fmtBeatmapTitle(score.beatmap.title)}</span>
          <span className="text-sm">{`by ${score.beatmap.artist}`}</span>
        </div>
        <div>{`[${score.beatmap.difficulty}]`}</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span>{score.mods}</span>
        <span>{`${fmtFloat(score.acc, 2)}%`}</span>
        <span>{`${fmtInt(score.pp)}pp`}</span>
      </div>
    </Link>
  );
};
