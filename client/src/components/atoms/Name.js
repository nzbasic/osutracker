import React from "react";
import Button from "@material-ui/core/Button";
import "../../css/Material.css";

export default function Name(props) {
  return (
    <div>
      <Button
        id="button"
        variant="contained"
        color="primary"
        href={"/user/" + props.name}
      >
        {props.name}
      </Button>
    </div>
  );
}
