import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "react-animate-on-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AllCountries() {
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/countries/id").then((res) => {
      setCountryData(res.data.sort((a, b) => b.pp - a.pp));
      setLoading(false);
    });
  }, []);

  const Country = ({ data, index }) => (
    <ScrollAnimation animateIn="animate__slideInRight" offset={0} animateOnce>
      <div className="bg-main-one w-full rounded-md shadow-md">
        <div className="p-2 flex justify-between">
          <div>
            {index}
            <a
              className="hover:text-main-four pl-2"
              href={"/country/" + data.name}
            >
              {data.name}
            </a>
          </div>

          <div className="flex">
            {Math.round(parseFloat(data.pp)) + "pp"}
            <div className="ml-2">
              {parseFloat(data.acc * 100).toFixed(2) + "%"}
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex flex-col space-y-2 lg:mt-4 p-2 w-smgraph ml-4 mt-16">
      {countryData.map((data, index) => (
        <div className="w-full">
          <Country key={data.name} data={data} index={index} />
        </div>
      ))}
    </div>
  );
}
