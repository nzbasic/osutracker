import axios from "axios";
import React, { useEffect } from "react";

export default function UserRedirect(props) {
  useEffect(() => {
    const userPromise = axios.get(
      "/api/users/" + props.match.params.name + "/getId"
    );

    userPromise.then((res) => {
      window.location.replace("/user/" + res.data);
    });
  });

  return <div></div>;
}
