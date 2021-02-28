import React, { useState, useEffect } from "react";
import axios from "axios";
import ScrollAnimation from "react-animate-on-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/users/id").then((res) => {
      setUserData(res.data.sort((a, b) => b.pp - a.pp));
      setLoading(false);
    });
  }, []);

  const User = ({ data }) => (
    <ScrollAnimation animateIn="animate__slideInRight" offset={0} animateOnce>
      <div className="bg-main-one w-full rounded-md shadow-md">
        <div className="p-2 flex justify-between">
          <a className="hover:text-main-four" href={"/user/" + data.id}>
            {data.name}
          </a>
          <div className="flex">
            {Math.round(parseFloat(data.pp)) + "pp"}
            <div className="ml-2">{parseFloat(data.acc).toFixed(2) + "%"}</div>
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
    <div className="flex flex-col space-y-2 lg:mt-4 mt-16 p-2 w-smgraph ml-4 ">
      {userData.map((data) => (
        <div className="w-full">
          <User key={data.name} data={data} />
        </div>
      ))}
    </div>
  );
}
