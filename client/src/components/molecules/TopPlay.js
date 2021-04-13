import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TopPlay({ id }) {
  const [map, setMap] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let map = (await axios.get("/api/stats/mapset/" + id)).data;
      setMap(map);
      setLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="mt-2 w-full flex flex-col items-center">
      <CircularProgress />
    </div>
  ) : (
    <a
      className="flex shadow-md rounded-md bg-main-one mt-4 p-2 text-xs md:text-base hover:text-main-four"
      href={"https://osu.ppy.sh/beatmaps/" + map.setId}
      target="_blank"
      rel="noreferrer"
    >
      <div>{map.mapper + " - "}</div>
      <div>{map.name}</div>
    </a>
  );
}
