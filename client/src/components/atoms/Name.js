import React from "react";
import Button from "@material-ui/core/Button";
import "../../css/Material.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#3B82F6'
  },
});

export default function Name(props) {
  const classes = useStyles()
  return (
    <div>
      <Button
        className={classes.root}
        id="button"
        variant="contained"
        href={"/user/" + props.name}
      >
        {props.name}
      </Button>
    </div>
  );
}
