import React, { useEffect } from "react";
import ItemTable from "../molecules/ItemTable.js";

export default function CountryUserList(props) {
  useEffect(() => {
    document.title = props.match.params.country + " Users";
  });

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
    <div className="mt-16 lg:mt-4">
      <ItemTable
        headers={headers}
        url={"/api/countries/allFilter/" + props.match.params.country}
        serverSidePagination={true}
      />
    </div>
  );
}
