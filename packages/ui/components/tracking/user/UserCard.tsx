import { User as UserV1 } from "database/schema/v1";
import { UserV2Dto } from "./temp-interfaces";
import { fmtInt, fmtFloat, fmtDate } from "../../util/fmt-strings";

import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface UserCardProps {
  v1User: UserV1;
  v2UserDto: UserV2Dto;
}

export const UserCard = ({ v1User, v2UserDto }: UserCardProps) => {
  return (
    <div className="rounded border border-edge">
      <div className="flex gap-3 p-2">
        <div className="border-r pr-2">
          <Image
            alt="profile-picture"
            src={v1User.url}
            width="256"
            height="256"
          />
        </div>
        <div className="my-auto">
          <div className="flex items-center">
            <Link
              className="text-3xl font-semibold text-black transition-all hover:text-blue-500"
              href={`https://osu.ppy.sh/users/${v2UserDto.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {v2UserDto.name}
            </Link>
            <ReactCountryFlag
              countryCode={v2UserDto.country}
              className="ml-2"
              style={{
                width: "30px",
                height: "20px",
              }}
              svg
            />
          </div>
          <div className="flex flex-col font-medium">
            <span>{`${fmtInt(v2UserDto.pp)}pp`}</span>
            <span>{`Rank #${fmtInt(v2UserDto.rank)}`}</span>
            <span>{`Acc ${fmtFloat(v2UserDto.acc, 2)}%`}</span>
            <span>{`Level ${fmtFloat(v2UserDto.level, 1)}`}</span>
            <span>{`Range ${fmtInt(v2UserDto.range)}pp`}</span>
            <span>{`Farm ${fmtInt(v2UserDto.farm)}%`}</span>
            <span>{`${fmtInt(v2UserDto.plays)} Plays`}</span>
            <span>{`Joined ${fmtDate(v2UserDto.joined)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
