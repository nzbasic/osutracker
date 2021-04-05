import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TopMapSets({ data }) {
  const [mapSets, setMapSets] = useState([{ mapper: "", name: "" }]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let arrayOfSetIds = data.map((item) => item.setId);

    const fetchData = async () => {
      setMapSets(
        (
          await axios.get("/api/stats/mapsets", {
            params: { arr: arrayOfSetIds },
          })
        ).data
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="mt-2 w-full flex flex-col items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="bg-main-one shadow-md rounded-md mt-4 p-2 flex flex-col text-xs md:text-base">
      {mapSets.map((map, index) => (
        <div key={index}>
          {index +
            1 +
            " " +
            map.mapper +
            " - " +
            map.name.replace(/(\[(.*?)\])/g, "") +
            ": " +
            data[index].count}
        </div>
      ))}
    </div>
  );
}
