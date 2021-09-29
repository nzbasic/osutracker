import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemTable from "../molecules/ItemTable.js";

export default function AllCountries() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleCountries = (data) => {
    let countries = data.data.sort(
      (a, b) => parseFloat(b.pp) - parseFloat(a.pp)
    );
    countries.forEach((country, index) => {
      country.rank = index;
      country.pp = parseFloat(country.pp).toFixed(2);
      country.acc = (country.acc * 100).toFixed(2);
      country.range = parseFloat(country.range).toFixed(2);
      country.averageObjects = parseInt(country.averageObjects);
      country.playerWeighting = parseFloat(
        country.playerWeighting ?? 0
      ).toFixed(2);
    });

    //console.log(data);

    setData(countries);
    setLoading(false);
  };

  useEffect(() => {
    document.title = "All Countries";

    axios
      .get("/api/countries/limitedAll")
      .then((data) => handleCountries(data));
  }, []);

  let headers = [
    { title: "#", sortBy: "rank", mobile: true },
    { title: "Country", sortBy: "name", mobile: true },
    { title: "pp (Plays)", sortBy: "pp", mobile: true },
    { title: "pp (Players)", sortBy: "playerWeighting", mobile: true },
    { title: "Acc", sortBy: "acc", mobile: true },
    { title: "Farm", sortBy: "farm", mobile: false },
    { title: "Range", sortBy: "range", mobile: false },
    { title: "Objects/Play", sortBy: "averageObjects", mobile: false },
  ];

  return isLoading ? (
    <div className="h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="mt-16 xl:mt-4 flex flex-col items-center">
      <a
        href="/compare/topCountries"
        className="mb-4 bg-main-four hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-main-four dark:text-white cursor-pointer py-1 px-2 font-semibold rounded-md"
      >
        Compare Top 10
      </a>
      <ItemTable items={data} headers={headers} serverSidePagination={false} />
    </div>
  );
}
