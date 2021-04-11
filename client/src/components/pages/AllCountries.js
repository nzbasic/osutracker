import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "react-animate-on-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemTable from "../molecules/ItemTable.js";

export default function AllCountries() {
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "All Countries";
    axios.get("/api/countries/limitedAll").then((res) => {
      let sorted = res.data.sort((a, b) => b.pp - a.pp);
      let filtered = sorted.filter(
        (obj) => obj.rank != 0 && obj.farm != -1 && obj.pp != 0
      );

      filtered.forEach((country, index) => {
        country.acc = parseFloat(country.acc * 100).toFixed(2);
        country.pp = parseFloat(country.pp).toFixed(1);
        country.rank = index;
        country.range = parseInt(country.range);
        country.averageObjects = parseInt(country.averageObjects);
      });

      setCountryData(filtered);
      setLoading(false);
    });
  }, []);

  let headers = [
    { title: "#", sortBy: "rank", mobile: true },
    { title: "Country", sortBy: "name", mobile: true },
    { title: "pp", sortBy: "pp", mobile: true },
    { title: "Acc", sortBy: "acc", mobile: true },
    { title: "Farm", sortBy: "farm", mobile: true },
    { title: "Range", sortBy: "range", mobile: true },
    { title: "Objects/Play", sortBy: "averageObjects", mobile: false },
  ];

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="mt-16 lg:mt-4">
      <ItemTable items={countryData} headers={headers} />
    </div>
  );
}
