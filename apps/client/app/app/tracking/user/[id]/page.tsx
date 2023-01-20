import Link from "next/link";
import { User as UserV1, UserStat as UserStatV1 } from "database/schema/v1";
import { proxy } from 'database';
import {
  UserCard,
  Score,
  convertV1UserToV2Dto,
  convertUserStatsV1ToV2,
  StatsLineGraphWithDropdown,
  PlaysScatterGraph,
  ScoreList
} from "ui";
import ReactCountryFlag from "react-country-flag";

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
      <div className="flex">
        <h2>{v2UserDto.name}</h2>
        <ReactCountryFlag countryCode={v2UserDto.country} svg />
      </div>
      </Link>
      <UserCard v2UserDto={v2UserDto} />

      <StatsLineGraphWithDropdown data={v2UserStats} />
      
      <PlaysScatterGraph data={scores} />

      <h3>v2 History</h3>
      <ScoreList scores={scores} />
    </div>
  );
};
