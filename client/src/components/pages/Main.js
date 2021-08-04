import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/Main.css";
import Search from "../molecules/Search.js";
import { CircularProgress } from "@material-ui/core";

export default function Main() {
  const [userNumber, setUsers] = useState(0);
  const [countryNumber, setCountries] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const handleCountries = (data) => {
    setCountries(data);
  };

  const handleUsers = (data) => {
    setUsers(data);
  };

  useEffect(() => {
    const countriesPromise = axios.get("/api/countries/number");
    const usersPromise = axios.get("/api/users/number");

    Promise.all([
      countriesPromise.then((res) => handleCountries(res.data)),
      usersPromise.then((res) => handleUsers(res.data)),
    ]).then(() => setLoading(false));
  }, []);

  return isLoading ? (
    <div className="h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex flex-col justify-center bg-main-four top-12 relative lg:static">
      <div id="firstDiv" className="w-full my-4 flex flex-col items-center">
        <div className="inline-block bg-main-one shadow rounded-lg self-center lg:text-7xl text-2xl text-center md:text-6xl font-bold m-4 p-4">
          Welcome to osuTracker.
        </div>
      </div>
      <div className="bg-main-two h-full  flex flex-col">
        <div
          id="firstDiv"
          className="self-center m-4 md:m-10 lg:m-14 md:w-72 h-80 mb-12"
        >
          <Search header={false} open={true} />
        </div>

        <div className="mt-6 lg:mt-14 mb-12 lg:mb-0 inline-flex flex-col self-center z-0">
          <div
            id="thirdDiv"
            className="flex flex-col w-full self-center bg-main-one shadow rounded-lg p-2 md:p-4 font-semibold md:text-lg text-sm"
          >
            <div className="text-center py-2">
              Tracks user stats, country stats, and global stats.
            </div>
            <div className="text-center py-2">All free. Updated daily.</div>
            <div className="text-center py-2">
              Currently tracking {userNumber} users and {countryNumber}{" "}
              countries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
