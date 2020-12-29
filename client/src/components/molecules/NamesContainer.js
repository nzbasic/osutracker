import React from "react";
import Name from "../atoms/Name";
import { v4 as uuidv4 } from "uuid";
import NewUser from "../atoms/NewUser";

export default function NamesContainer(props) {
  return (
    <div>
      <div>
        {props.names
          .sort((a, b) => a.localeCompare(b))
          .slice(0, 5)
          .map((name) => (
            <Name key={uuidv4()} name={name} />
          ))}
        <NewUser />
      </div>
    </div>
  );
}
