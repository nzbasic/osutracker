import React, { useEffect } from "react";
import ItemTable from "../molecules/ItemTable.js";

export default function AllUsers() {
  useEffect(() => {
    document.title = "All Countries";
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

  return (
    <div className="">
      <ItemTable
        headers={headers}
        serverSidePagination={true}
        url={"/api/users/allFilter"}
      />
    </div>
  );
}
