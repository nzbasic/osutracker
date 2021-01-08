import React from "react";
import Button from "@material-ui/core/Button";
import "../../css/Material.css";
import { useStyles } from '../../Style';

export default function Name(props) {
  const classes = useStyles()
  return (
    <div>
      <Button
        className={classes.primary}
        id="button"
        variant="contained"
        href={"/user/" + props.name}
      >
        {props.name}
      </Button>
    </div>
  );
}
