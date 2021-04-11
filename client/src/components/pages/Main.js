import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/Main.css";
import Search from "../molecules/Search.js";
import Footer from "../molecules/Footer.js";

export default function Main() {
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/countries/limitedAll").then((res) => {
      let countryList = [];
      res.data.forEach((country) => {
        country.type = "country";
        if (country.name === "Global") {
          country.url =
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg";
        } else {
          country.url =
            "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
            country.abbreviation +
            ".svg";
        }
        countryList.push(country);
      });
      setCountries(countryList);
    });

    axios.get("/api/users/limitedAll").then((res) => {
      let userList = [];
      res.data.forEach((user) => {
        user.type = "user";
        user.url = "http://s.ppy.sh/a/" + user.id;
        userList.push(user);
      });
      setUsers(userList);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-main-two h-full w-screen top-12 mt-2 relative lg:static flex flex-col">
      <div
        id="firstDiv"
        className="block bg-main-one shadow rounded-lg self-center w-11/12 lg:w-auto lg:text-7xl text-2xl text-center md:text-6xl font-bold m-4 p-4"
      >
        Welcome to osuTracker.
      </div>

      <div
        id="firstDiv"
        className="self-center m-4 md:m-10 lg:m-14 md:w-72 h-80 mb-12"
      >
        <Search items={users.concat(countries)} isLoading={isLoading} />
      </div>

      <div className="mt-2 inline-flex flex-col self-center">
        <div className="flex flex-row self-center my-4 space-x-5 space-y-0">
          <div
            id="secondDiv"
            className="block bg-main-one shadow md:text-2xl w-24 md:w-52 text-center rounded-lg self-center p-4"
          >
            Tracks User Progress.
          </div>
          <div
            id="secondDiv"
            className="block bg-main-one shadow md:text-2xl w-24 md:w-52 text-center rounded-lg self-center p-4"
          >
            Tracks Country Progress.
          </div>
          <div
            id="secondDiv"
            className="block bg-main-one shadow md:text-2xl w-24 md:w-52 text-center rounded-lg self-center p-4"
          >
            Tracks Global Progress.
          </div>
        </div>
        <div
          id="thirdDiv"
          className="flex flex-col w-full self-center bg-main-one shadow rounded-lg p-3 font-semibold md:text-lg text-sm"
        >
          <div className="text-center py-2">All Free.</div>
          <div className="text-center py-2">Updated Daily.</div>
          <div className="text-center py-2">
            Currently Tracking{" "}
            <span className="text-main-four">{users.length}</span> Users and{" "}
            <span className="text-main-four">{countries.length}</span>{" "}
            Countries.
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
