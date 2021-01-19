import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../molecules/Header"
import AccGraph from "./../atoms/graphs/AccGraph";
import PpGraph from "./../atoms/graphs/PpGraph";
import RankGraph from "./../atoms/graphs/RankGraph";
import PlayGraph from "./../atoms/graphs/PlayGraph";
import Loader from "react-loader-spinner";
import User from "../molecules/User";
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import "../../css/Graph.css";
import TimeSeriesChart from '../molecules/TimeSeriesChart'

export default function UserGraph(props) {
  const [ppPoints, setPpPoints] = useState([]);
  const [accPoints, setAccPoints] = useState([]);
  const [playPoints, setPlayPoints] = useState([]);
  const [rankPoints, setRankPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("/players/" + props.match.params.name).then((response) => {
      setUserData(response.data);
    });

    axios.get("/stats/" + props.match.params.name).then((response) => {
      let pp = [];
      let acc = [];
      let play = [];
      let rank = [];

      for (let i = 0; i < response.data.length; i++) {
        pp.push({
          x: response.data[i].date,
          y: parseInt(response.data[i].pp),
        });
        rank.push({
          x: response.data[i].date,
          y: parseInt(response.data[i].rank),
        });
        acc.push({
          x: response.data[i].date,
          y: parseFloat(response.data[i].acc),
        });
        play.push({
          x: response.data[i].date,
          y: parseInt(response.data[i].plays),
        });
      }

      pp.sort((a, b) => a.x - b.x);
      rank.sort((a, b) => a.x - b.x);
      acc.sort((a, b) => a.x - b.x);
      play.sort((a, b) => a.x - b.x);

      setPpPoints(pp);
      setAccPoints(acc);
      setRankPoints(rank);
      setPlayPoints(play);
      setLoading(false);
    });
  }, [props.match.params.name]);

  return loading ? (
    <div className="h-screen bg-main-two">
      <div className="load ">
        <Loader id="spinner" type="ThreeDots" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-screen bg-main-two text-main-four">
      <Header />
      <User data={userData} />
      <div className="flex flex-col lg:h-full">
        <div className="flex flex-col lg:flex-row lg:h-full h-screen">
          <div className="h-full w-full bg-main-four flex flex-col">
            <div className="text-main-one self-center">Pp</div>
            <TimeSeriesChart chartData={ppPoints} />
          </div>
          <div className="h-full w-full bg-main-four flex flex-col">
            <div className="text-main-one self-center">Rank</div>
            <TimeSeriesChart chartData={rankPoints} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row h-screen lg:h-full">
          <div className="h-full w-full bg-main-four flex flex-col">
            <div className="text-main-one self-center">Acc</div>
            <TimeSeriesChart chartData={accPoints} />
          </div>
          <div className="h-full w-full bg-main-four flex flex-col">
            <div className="text-main-one self-center">Plays</div>
            <TimeSeriesChart chartData={playPoints} />
          </div>
        </div>
      </div>
    </div>
  );
}
