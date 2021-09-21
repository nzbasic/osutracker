import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TopMapSets({ data }) {
  const [mapSets, setMapSets] = useState([{ mapper: "", name: "" }]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let arrayOfSetIds = data.map((item) => item.setId);

    const fetchData = async () => {
      let batchNumber = 100;
      let batches = arrayOfSetIds.length / batchNumber;

      let allMaps = [];
      for (let i = 0; i <= batches; i++) {
        let batch = await axios.get("/api/stats/mapsets", {
          params: { arr: arrayOfSetIds.slice(i * 100, i * 100 + 100) },
        });
        allMaps.push(...batch.data);
      }

      setMapSets(allMaps);
      setLoading(false);
    };
    fetchData();
  }, [data]);

  return isLoading ? (
    <div className="mt-2 w-full flex flex-col items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="bg-main-one dark:bg-gray-700 dark:text-white shadow-md rounded-md mt-4 p-2 flex flex-col text-xs md:text-base">
      {mapSets.map((map, index) => (
        <a
          key={index}
          href={"https://osu.ppy.sh/beatmapsets/" + map.setId}
          className="hover:text-main-four"
          target="_blank"
          rel="noreferrer"
        >
          {index +
            1 +
            " " +
            map.mapper +
            " - " +
            map.name.replace(/(\[(.*?)\])/g, "") +
            ": " +
            data[index].count}
        </a>
      ))}
    </div>
  );
}
