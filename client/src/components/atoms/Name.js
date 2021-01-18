import React from "react";
import Button from "@material-ui/core/Button";
import "../../css/Material.css";
import Image from '../atoms/Image'

export default function Name(props) {
  const name = props.data.name
  const type = props.data.type

  return (
    type === "player" ? 
    <div>
      <Button
        id="button"
        variant="contained"
        color="primary"
        href={"/user/" + name}
      >
        {name}
      </Button>
    </div> : 
    <div>
      <Button
        id="button"
        variant="contained"
        color="secondary"
        href={"/country/" + name}
      >
        <div className="flex flex-row">
          {name}
          <div className="self-center px-2">
            <Image
                height={20}
                width={30}
                link={
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                props.data.abbreviation +
                ".svg"
              }
            />
          </div>
        </div>
      </Button>
    </div>
  );
}
