import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import clone from "lodash/clone";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UserTable({ items, headers }) {
  const [data, setData] = useState(items);
  const [showing, setShowing] = useState(0);

  const toggleSort = (type) => {
    let copy = clone(data);
    if (parseFloat(data[0][type]) >= parseFloat(data[1][type])) {
      copy.sort((a, b) => parseFloat(a[type]) - parseFloat(b[type]));
    } else {
      copy.sort((a, b) => parseFloat(b[type]) - parseFloat(a[type]));
    }
    setShowing(0);
    setData(copy);
  };

  const preventOverflow = (string, number) =>
    string.length > number ? string.slice(0, number) + "..." : string;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-main-one shadow-md rounded-md p-2 font-semibold flex space-x-2">
        <div
          className={`${
            showing > 0 ? "block" : "invisible"
          } hover:text-main-four cursor-pointer select-none`}
          onClick={() => setShowing(showing - 50)}
        >
          ⟵
        </div>
        <div>Showing {showing + 1 + "-" + (showing + 50)}</div>
        <div
          className={`${
            showing < items.length - 50 ? "block" : "invisible"
          } hover:text-main-four cursor-pointer select-none`}
          onClick={() => setShowing(showing + 50)}
        >
          ⟶
        </div>
      </div>

      <div className="flex space-x-2 m-4 text-xs md:text-base">
        {headers.map((header) => (
          <div
            key={header.title}
            className={`${
              header.mobile ? "flex" : "hidden md:flex"
            } flex-col space-y-2`}
          >
            <div
              className={`${
                header.sortBy === "name" ? "" : "hover:underline cursor-pointer"
              } bg-main-one shadow-md rounded-md px-2 py-1 text-center `}
              onClick={() => toggleSort(header.sortBy)}
            >
              {header.title}
            </div>
            <div>
              {data.slice(showing, showing + 50).map((user, index) => (
                <div key={uuidv4()} className="text-center">
                  <div className="bg-main-one rounded-sm shadow-md mb-1 px-2 py-1">
                    {header.title === "Name" ? (
                      <a
                        href={"/user/" + user.id}
                        className="hover:text-main-four"
                      >
                        {preventOverflow(user[header.sortBy], 12)}
                      </a>
                    ) : header.title === "Joined" ? (
                      new Date(user[header.sortBy]).toLocaleDateString()
                    ) : header.title === "Country" ? (
                      <a
                        href={"/country/" + user.name}
                        className="hover:text-main-four"
                      >
                        {preventOverflow(user[header.sortBy], 15)}
                      </a>
                    ) : (
                      user[header.sortBy]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
