import Link from "next/link";
import { User as UserV1, UserStat as UserStatV1 } from "database/schema/v1";
import {
  UserCard,
  Score,
  convertV1UserToV2Dto,
  convertUserStatsV1ToV2,
  StatsLineGraphWithDropdown
} from "ui";
import { proxy } from 'database';

// TODO: Replace this with a call to the db that returns UserV2Dto
async function getUser(id: number): Promise<UserV1> {
  const user = await fetch(`https://osutracker.com/api/users/${id}`);
  return user.json();
}

async function getUserStats(id: number): Promise<UserStatV1[]> {
  const userStats = await fetch(`https://osutracker.com/api/users/${id}/stats`)
  return userStats.json();
}

async function getScores(id: number) {
  const scores = await fetch(`http://localhost:8080/api/v2/user/${id}/top`)
  return await scores.json() as proxy.Score[]
}

export default async function Page({ params }: { params: { id: number } }) {
  const v1User = await getUser(params.id);
  const v2UserDto = convertV1UserToV2Dto(v1User);
  const v1UserStats = await getUserStats(params.id);
  const v2UserStats = convertUserStatsV1ToV2(v1UserStats);
  const scores = await getScores(params.id);

  if (v1User == null) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        className="text-3xl font-semibold text-black transition-all hover:text-blue-500"
        href={`https://osu.ppy.sh/users/${v2UserDto.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{v1User.name}&apos;s Profile</h2>
      </Link>
      <UserCard v1User={v1User} v2UserDto={v2UserDto} />

      <StatsLineGraphWithDropdown data={v2UserStats} />
      
      <div className="border-edge rounded border">
        [Graph Top Play Time Scatter]
      </div>

      {/* <h3>Top Play History</h3>
      <div className="flex flex-col gap-2 font-medium">
        {v2UserDto.currentTop.slice(0, 10).map((score, index) => (
          <ScoreCard score={score} key={index} />
        ))}
      </div> */}

      <h3>v2 History</h3>
      <div className="space-y-1">
        {scores.map((score, index) => (
          <Score
            key={score.id}
            number={index + 1}
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
        ))}
      </div>
    </div>
  );
};
