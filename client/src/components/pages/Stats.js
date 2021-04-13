import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import AverageUser from "../molecules/AverageUser.js";
import AverageCountry from "../molecules/AverageCountry.js";
import UserPlays from "../molecules/UserPlays.js";
import TopPlay from "../molecules/TopPlay.js";
import TopMods from "../molecules/TopMods.js";
import TopMappers from "../molecules/TopMappers.js";
import TopMapSets from "../molecules/TopMapSets.js";
import Footer from "../molecules/Footer.js";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let stats = (await axios.get("/api/stats/")).data;
      setStats(stats);
      setLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex flex-col w-full items-center">
      <div className="inline-flex flex-col w-smgraph lg:w-3/5 items-center mt-12 lg:mt-0">
        <div className="w-full flex flex-wrap justify-center">
          <div className="m-2">
            <div className="mt-4 bg-main-one shadow-md rounded-md p-2 font-bold text-center">
              Average Tracked User
            </div>
            <div>
              <AverageUser data={stats.userStats} />
            </div>
          </div>

          <div className="h-full flex flex-col m-2">
            <div className="mt-4 bg-main-one shadow-md rounded-md p-2 font-bold text-center">
              Average Tracked Country
            </div>
            <div className="h-full">
              <AverageCountry data={stats.countryStats} />
            </div>
          </div>
        </div>

        <div className="my-4 rounded-md shadow-md bg-main-one p-2 text-center">
          For the following stats, the number refers to the number of times that
          item is seen among the top 100 plays of all tracked users.
        </div>

        <div className="mt-2 w-full bg-main-one shadow-md rounded-md p-2 font-bold text-center">
          Average Top Play
        </div>

        <div className="w-full">
          <TopPlay id={stats.userStats.topPlay} />
        </div>

        <div className="mt-4 w-full bg-main-one shadow-md rounded-md p-2 font-bold text-center">
          Top 10 Mods
        </div>
        <div className="w-full">
          <TopMods data={stats.userStats.modsCount.slice(0, 10)} />
        </div>

        <div className="mt-4 w-full bg-main-one shadow-md rounded-md p-2 font-bold text-center">
          Top 50 Mappers
        </div>
        <div className="w-full">
          <TopMappers data={stats.mapperCount.slice(0, 50)} />
        </div>

        <div className="mt-4 w-full bg-main-one shadow-md rounded-md p-2 font-bold text-center">
          Top 727 Map Sets
        </div>
        <div className="w-full">
          <TopMapSets data={stats.setCount.slice(0, 727)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
