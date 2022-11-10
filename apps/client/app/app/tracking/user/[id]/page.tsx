import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import ReactCountryFlag from "react-country-flag";
import { Types } from "mongoose";
import { User as UserV1, Score as ScoreV1 } from "database/schema/v1";
import { User as UserV2, ModCount as ModCountV2 } from "database/schema/v2";
import {
  UserCard,
  ScoreCard,
  ScoreV2Dto,
  UserV2Dto,
  convertV1UserToV2Dto,
} from "ui";

// TODO: Replace this with a call to the db that returns UserV2Dto
async function getUser(id: number): Promise<UserV1> {
  const user = await fetch(`https://osutracker.com/api/users/${id}`);
  return user.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const v1User = await getUser(params.id);
  const v2UserDto = convertV1UserToV2Dto(v1User);

  if (v1User == null) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-col min-w-min">
          <UserCard v1User={v1User} v2UserDto={v2UserDto} />
          <div>
            <div className="text-center italic">
              Note: At the time of a pp rework, many plays will be green
            </div>
            <div className="flex flex-col gap-2 font-medium">
              {v2UserDto.currentTop.slice(0, 10).map((score, index) => (
                <ScoreCard score={score} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>[Graph]</h2>
          <h2>[Graph Top Play Time Scatter]</h2>
        </div>
      </div>
    </div>
  );
}
