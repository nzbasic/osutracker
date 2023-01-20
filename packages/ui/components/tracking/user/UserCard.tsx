import { User as UserV1 } from "database/schema/v1";
import { UserV2Dto } from "./temp-interfaces";
import { fmtInt, fmtFloat, fmtDate } from "../../util/fmt-strings";

import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface UserCardProps {
  v2UserDto: UserV2Dto;
}

export const UserCard = ({ v2UserDto }: UserCardProps) => {
  return (
    <div className="flex gap-4">
      <Image
        className="rounded-md"
        alt="profile-picture"
        src={`https://a.ppy.sh/${v2UserDto.id}`}
        width="156"
        height="156"
      />

      <div className="my-auto">
        <div className="flex flex-col font-medium">
          <span>{`${fmtInt(v2UserDto.pp)}pp`}</span>
          <span>{`Rank #${fmtInt(v2UserDto.rank)}`}</span>
          <span>{`Acc ${fmtFloat(v2UserDto.acc, 2)}%`}</span>
          <span>{`Level ${fmtFloat(v2UserDto.level, 1)}`}</span>
          <span>{`${fmtInt(v2UserDto.range)}pp Range`}</span>
          <span>{`${fmtInt(v2UserDto.farm)}% Farm`}</span>
          {/* <span>{`${fmtInt(v2UserDto.plays)} Plays`}</span>
          <span>{`Joined ${fmtDate(v2UserDto.joined)}`}</span> */}
        </div>
      </div>
    </div>
  );
};
