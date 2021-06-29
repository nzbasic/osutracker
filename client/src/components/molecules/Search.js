import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import TrackedContainer from "../molecules/TrackedContainer.js";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Search({ items, isLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [shownNumber, setShownNumber] = useState(0);

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setShownNumber(0);
  };

  const dynamicSearch = () => {
    let filter = items.filter((name) =>
      name.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filter;
  };

  return isLoading ? (
    <div className="flex justify-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <TextField
        variant="outlined"
        label="Player or Country"
        fullWidth={true}
        value={searchTerm}
        onChange={editSearchTerm}
      />
      <TrackedContainer
        items={dynamicSearch()}
        term={searchTerm}
        shown={shownNumber}
      />
      <div className="bg-main-one flex shadow p-1 w-40 mt-2 lg:mt-3 rounded justify-between">
        <div
          className={`${
            shownNumber > 0 ? "block" : "invisible"
          } hover:text-main-four cursor-pointer select-none`}
          onClick={() => setShownNumber(shownNumber - 5)}
        >
          ⟵
        </div>
        <div className="font-semibold">
          {shownNumber + 1 + "-" + (shownNumber + 5)}
        </div>
        <div
          className={`${
            shownNumber + 5 < dynamicSearch().length ? "block" : "invisible"
          } hover:text-main-four cursor-pointer select-none`}
          onClick={() => setShownNumber(shownNumber + 5)}
        >
          ⟶
        </div>
      </div>
    </div>
  );
}
