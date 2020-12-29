import React from "react";

export default function Image(props) {
  return (
    <div>
      <img src={props.link} width={props.width} height={props.height} />
    </div>
  );
}
