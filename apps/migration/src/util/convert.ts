import { v1, v2 } from 'database';
import { Types } from 'mongoose';

export function convertV1Scores(
  scores: v1.ScoreDocument[] | Types.Array<v1.Score>,
) {
  const migratedScores: v2.Score[] = scores.map((score) => {
    return convertV1Score(score);
  });

  return new Types.Array(migratedScores) as unknown as Types.Array<v2.Score>;
}

export function convertV1Score(score: v1.ScoreDocument | v1.Score) {
  return {
    beatmapId: Number(score.id),
    beatmapSetId: Number(score.setId),
    mods: score.mods,
    acc: score.acc * 100,
    pp: Number(score.pp),
    player: score.player,
    countMiss: Number(score.missCount),
    time: score.time ? new Date(score.time) : undefined,
  };
}
