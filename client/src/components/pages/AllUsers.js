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
    <div className="mt-16 lg:mt-4 flex flex-col items-center">
      <a
        href="/compare/topUsers"
        className="bg-main-four mb-4 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-main-four dark:text-white cursor-pointer py-1 px-2 font-semibold rounded-md"
      >
        Compare Top 10
      </a>
      <ItemTable
        headers={headers}
        serverSidePagination={true}
        url={"/api/users/allFilter"}
      />
    </div>
  );
}
