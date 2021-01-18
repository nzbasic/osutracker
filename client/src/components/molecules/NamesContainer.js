import React from "react";
import Name from "../atoms/Name";
import { v4 as uuidv4 } from "uuid";
import NewUser from "../atoms/NewUser";

export default function NamesContainer(props) {

  let list = props.names.sort((a,b) => a.name.localeCompare(b.name)).slice(0,5)

  return (
    <div>
      <div>
        {list
          .map((name) => (
            <Name key={uuidv4()} data={name} />
          ))}
        <NewUser />
      </div>
    </div>
  );
}
