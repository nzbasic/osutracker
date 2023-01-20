import { proxy } from "database"
import { Score } from "../../osu";

interface ScoreListProps {
  scores: proxy.Score[]
}

const dataToScore = (score: proxy.Score, number: number) => (
  <Score
    key={score.id}
    number={number}
    rank={score.rank}
    setId={score.beatmap.beatmapset_id}
    id={score.beatmap.id}
    title={score.beatmapset.title} 
    artist={score.beatmapset.artist} 
    difficulty={score.beatmap.version} 
    mods={score.mods}
    acc={score.accuracy}
    pp={score.pp ?? 0}
    countMiss={score.statistics.count_miss}
    count300={score.statistics.count_300}
    count100={score.statistics.count_100}
    count50={score.statistics.count_50}
  />
)

export const ScoreList = ({ scores }: ScoreListProps) => {
  const realScores = scores.slice(0, 100);
  const estimatedScores = scores.slice(100)

  return (
    <div className="flex flex-col gap-1">
      {realScores.map((score, index) => dataToScore(score, index + 1))}
      <span className="text-center my-4">Score placements below may be inaccurate</span>
      {estimatedScores.map((score, index) => dataToScore(score, index + 101))}
    </div>
  );
};
