import Mods from "./Mods";
import Number from './Number';
import { Rank } from "./Rank";

interface ScoreProps {
  rank: string;
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

export const Score = ({ rank, title, artist, difficulty, mods, acc, pp, count50, count100, count300, countMiss, number }: ScoreProps) => {
  return (
    <div className="flex justify-between items-center gap-2 p-2 bg-gray-50 font-medium">
      <div className="flex gap-2 items-center">
        <Number number={number} />
        <Rank letter={rank} />
        <div className="flex flex-col truncate max-w-lg">
          <span className="text-sm truncate">{artist} - {title}</span>
          <span className="text-xs leading-0">[{difficulty}]</span>
        </div>
      </div>

      <div className="flex items-center shrink-0 gap-4">
        <Mods mods={mods} />
        <span className="w-14">{acc === 1 ? 100 : (acc*100).toFixed(2)}%</span>
        <span className="w-14">{Math.round(pp)}pp</span>
      </div>
    </div>
  )
};
