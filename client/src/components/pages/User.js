import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import UserDetails from "../molecules/UserDetails";
import UserGraphs from "../molecules/UserGraphs";
import UserPlays from "../molecules/UserPlays";

export default function User(props) {
  const [userData, setUserData] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [userPlays, setUserPlays] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleData = (data) => {
    if (data[0]) {
      document.title = data[0].name;
      setUserData(data[0]);
    }
  };

  const handleStats = (stats) => {
    setUserStats(stats);
  };

  const handlePlays = (plays) => {
    setUserPlays(plays);
  };

  useEffect(() => {
    const userDataPromise = axios.get("/api/users/" + props.match.params.id);
    const userStatsPromise = axios.get(
      "/api/users/" + props.match.params.id + "/stats"
    );
    const userPlaysPromise = axios.get(
      "/api/users/" + props.match.params.id + "/plays"
    );

    Promise.all([
      userDataPromise.then((res) => handleData(res.data)),
      userStatsPromise.then((res) => handleStats(res.data)),
      userPlaysPromise.then((res) => handlePlays(res.data)),
    ]).then(() => setLoading(false));
  }, [props.match.params.id]);

  return isLoading ? (
    <div className="h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full">
        <UserDetails data={userData} />

        {userData.farm !== -1 ? (
          <div className="inline-flex flex-col items-center ">
            <UserGraphs data={userStats} />
            <UserPlays plays={userPlays} currentTop={userData.currentTop} />
          </div>
        ) : (
          <div className="text-center dark:text-white">
            Please wait up to 24 hours for new profiles to fully start tracking.
          </div>
        )}
      </div>
    </div>
  );
}
