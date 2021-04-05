import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import UserDetails from "../molecules/UserDetails";
import UserGraphs from "../molecules/UserGraphs";
import UserPlays from "../molecules/UserPlays";
import Footer from "../molecules/Footer";

export default function User(props) {
  const [userData, setUserData] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [userPlays, setUserPlays] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let userData = (await axios.get("/api/users/" + props.match.params.id))
        .data[0];
      if (userData) {
        setUserData(userData);
        document.title = userData.name;
        if (userData.farm !== -1) {
          let userStats = await axios.get(
            "/api/users/" + props.match.params.id + "/stats"
          );

          setUserStats(userStats.data);

          let userPlays = await axios.get(
            "/api/users/" + props.match.params.id + "/plays"
          );

          setUserPlays(userPlays.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [props.match.params.id]);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
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
            <div className="max-w-lg w-full">
              <Footer />
            </div>
          </div>
        ) : (
          <div className="text-center">
            Please wait up to 24 hours for new profiles to fully start tracking.
          </div>
        )}
      </div>
    </div>
  );
}
