import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import CountryDetails from "../molecules/CountryDetails";
import CountryGraphs from "../molecules/CountryGraphs";
import CountryContributors from "../molecules/CountryContributors";
import CountryPlayers from "../molecules/CountryPlayers";
import UserPlays from "../molecules/UserPlays";
import Footer from "../molecules/Footer";
import "../../css/Main.css";

export default function Country(props) {
  const [countryDetails, setCountryDetails] = useState([]);
  const [countryStats, setCountryStats] = useState([]);
  const [countryPlayers, setCountryPlayers] = useState([]);
  const [countryPlays, setCountryPlays] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    document.title = props.match.params.name;

    const fetchData = async () => {
      let countryDetails = (
        await axios.get(
          "/api/countries/" + props.match.params.name + "/details"
        )
      ).data[0];
      setCountryDetails(countryDetails);

      let countryStats = (
        await axios.get("/api/countries/" + props.match.params.name + "/stats")
      ).data;
      setCountryStats(countryStats);

      let countryPlays = (
        await axios.get("/api/countries/" + props.match.params.name + "/plays")
      ).data;
      setCountryPlays(countryPlays);

      let countryPlayers = (
        await axios.get(
          "/api/countries/" + props.match.params.name + "/players"
        )
      ).data;
      setCountryPlayers(countryPlayers);
      setLoading(false);
    };
    fetchData();
  }, [props.match.params.name]);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex w-full justify-center">
      <div className="inline-flex flex-col items-center w-smgraph lg:w-graph">
        <div id="firstDiv">
          <CountryDetails details={countryDetails} />
        </div>
        <a
          id="firstDiv"
          className={`${
            props.match.params.name === "Global" ? "hidden" : "block"
          } bg-main-one rounded-md shadow-md p-2 mb-2 cursor-pointer hover:text-main-four`}
          href={"/allusers/" + props.match.params.name}
        >
          View Player List
        </a>
        <div id="firstDiv" className="text-center">
          Country stats are based on the Top 100 plays made by the Top 50
          players. (Global is 150 + some outliers)
        </div>
        <div
          id="secondDiv"
          className="w-smgraph lg:w-graph flex justify-center items-center flex flex-col"
        >
          <CountryGraphs stats={countryStats} />
          <CountryContributors contributors={countryDetails.contributors} />
        </div>

        <div
          id="secondDiv"
          className="bg-main-one rounded-md font-semibold shadow-md p-2 mb-6"
        >
          Top 10 Tracker
        </div>
        <div id="thirdDiv">
          <CountryPlayers players={countryPlayers} />
        </div>
        <div id="thirdDiv" className="inline-flex w-full mt-6 lg:px-0">
          <UserPlays
            currentTop={countryDetails.scoresCurrent}
            plays={countryPlays}
            country={true}
          />
        </div>
      </div>
    </div>
  );
}
