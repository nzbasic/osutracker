import React from "react";
import Button from "@material-ui/core/Button";

export default function NewUser() {
  return (
    <div>
      <Button id="button" variant="contained" color="secondary" href={"/add"}>
        Apply Now
      </Button>
    </div>
  );
}
