import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";

export default function User(props) {
  return (
    <div>
      <div className="flex flex-row px-1">
        <div className="outline-inner">
          <Image height={100} width={100} link={props.data[0].url} />
        </div>

        <div className="flex flex-col self-center px-2">
          <div className="flex flex-row ">
            <Text text={props.data[0].name} />
            <div className="self-center m-1 py-1">
              <Image
                height={12}
                width={18}
                link={
                  "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                  props.data[0].country +
                  ".svg"
                }
              />
            </div>
          </div>
          <div>
            <Text text={props.data[0].pp + "pp  "} />
            <div className="py-1">
              <Text text={"#" + props.data[0].rank} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
