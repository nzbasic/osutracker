import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import clone from "lodash/clone";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemTable from "../molecules/ItemTable.js";

export default function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleUsers = (users) => {
    let sorted = users.sort((a, b) => b.pp - a.pp);
    let filtered = sorted.filter(
      (obj) =>
        obj.rank != 0 && obj.level !== null && obj.farm != -1 && obj.pp != 0
    );

    filtered.forEach((user) => {
      user.acc = parseFloat(user.acc).toFixed(2);
      user.level = user.level.toFixed(1);
      user.pp = parseFloat(user.pp).toFixed(1);
      user.averageObjects = parseInt(user.averageObjects);
      user.range = parseInt(user.range);
    });

    setUserData(filtered);
  };

  useEffect(() => {
    document.title = "All Players";

    const usersPromise = axios.get("/api/users/limitedAll");

    Promise.all([usersPromise.then((res) => handleUsers(res.data))]).then(() =>
      setLoading(false)
    );
  }, []);

  let headers = [
    { title: "#", sortBy: "rank", mobile: true },
    { title: "Name", sortBy: "name", mobile: true },
    { title: "pp", sortBy: "pp", mobile: true },
    { title: "Acc", sortBy: "acc", mobile: true },
    { title: "Farm", sortBy: "farm", mobile: true },
    { title: "Range", sortBy: "range", mobile: true },
    { title: "Level", sortBy: "level", mobile: false },
    { title: "Joined", sortBy: "joined", mobile: false },
    { title: "Objects/Play", sortBy: "averageObjects", mobile: false },
  ];

  return isLoading ? (
    <div className="h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="mt-16 lg:mt-4">
      <ItemTable items={userData} headers={headers} />
    </div>
  );
}
