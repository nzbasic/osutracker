import axios from "axios";
import React, { useEffect } from "react";

export default function UserRedirect(props) {
  useEffect(() => {
    const fetchData = async () => {
      let found = await axios.get(
        "/api/users/" + props.match.params.name + "/getId"
      );
      window.location.replace("/user/" + found.data);
    };
    fetchData();
  });

  return <div></div>;
}
