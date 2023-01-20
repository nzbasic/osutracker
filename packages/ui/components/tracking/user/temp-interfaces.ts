import { Types } from "mongoose";
import { User as UserV1 } from "database/schema/v1";
import { ModCount as ModCountV2 } from "database/schema/v2";
import { UserStat as UserStatV1 } from "database/schema/v1";
import { UserStat as UserStatV2 } from "database/schema/v2";

/*********************************************************************************************/
// Notes:
// All these functions/interfaces should be deleted once real DTOs for Scores and Users are
// available from the V2 API.
/*********************************************************************************************/

/** BEGIN UserCard and ScoreCard */
export interface BeatmapV2 {
  id: number;
  title: string;
  artist: string;
  difficulty: string;
}

export interface ScoreV2Dto {
  beatmap: BeatmapV2; // actual Beatmap instead of beatmapId
  acc: number;
  mods: Types.Array<string>;
  pp: number;
}

export interface UserV2Dto {
  id: number;
  name: string;
  country: string;
  pp: number;
  rank: number;
  acc: number;
  joined: Date;
  level: number;
  plays: number;
  range: number;
  farm: number;
  averageLength: number;
  averageObjects: number;
  currentTop: Types.Array<ScoreV2Dto>; // ScoreDto instead of Score
  modsCount: Types.Array<ModCountV2>;
}

export function convertV1UserToV2Dto(v1User: UserV1) {
  // convert ScoreV1 to ScoreV2Dto's
  const v2CurrentTop: ScoreV2Dto[] = v1User.currentTop100.map((score) => {
    return {
      beatmap: {
        id: Number(score.id),
        title: score.name.split(" - ")[1].split("[")[0], // hack to get name of map on its own for now
        artist: "ARTIST",
        difficulty: "DIFFICULTY",
      },
      acc: score.acc * 100,
      mods: score.mods,
      pp: Number(score.pp),
    };
  });
  // make UserV2Dto
  const v2User: UserV2Dto = {
    id: Number(v1User.id),
    name: v1User.name,
    country: v1User.country,
    pp: Number(v1User.pp),
    rank: Number(v1User.rank),
    acc: Number(v1User.acc),
    joined: new Date(v1User.joined),
    level: v1User.level,
    plays: Number(v1User.plays),
    range: Number(v1User.range),
    farm: v1User.farm,
    averageLength: v1User.averageLength,
    averageObjects: v1User.averageObjects,
    modsCount: v1User.modsCount,
    currentTop: v2CurrentTop as Types.Array<ScoreV2Dto>, // funny JS Array to Mongoose array
  };
  return v2User;
}
/** END UserCard and ScoreCard **/

/** BEGIN StatsLineGraphWithDropdown */
export type NextUserStatV2 = Omit<UserStatV2, 'date'> & { date: number }

function convertUserStatV1ToV2(userStatV1: UserStatV1): NextUserStatV2 {
  const userStatV2: NextUserStatV2 = {
    rank: Number(userStatV1.rank),
    pp: Number(userStatV1.pp),
    plays: Number(userStatV1.plays),
    acc: Number(userStatV1.acc),
    playerId: Number(userStatV1.id),
    player: userStatV1.player,
    date: userStatV1.date,
    countryRank: userStatV1.countryRank,
    farm: userStatV1.farm,
    range: userStatV1.range,
    score: userStatV1.score,
  };
  return userStatV2;
}

export function convertUserStatsV1ToV2(userStatsV1: UserStatV1[]): NextUserStatV2[] {
  const userStatsV2: NextUserStatV2[] = [];
  for (let i = 0; i < userStatsV1.length; i++) {
    userStatsV2.push(convertUserStatV1ToV2(userStatsV1[i]));
  }
  return userStatsV2;
}
/** END UserStatGraph */
