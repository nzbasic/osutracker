import React from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from '../../Style';

export default function NewUser() {
  const classes = useStyles()
  return (
    <div>
      <Button id="button" variant="contained" className={classes.secondary} href={"/add"}>
        Apply Now
      </Button>
    </div>
  );
}
