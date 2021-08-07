import React, { useState, useEffect } from "react";
import TrackedContainer from "../molecules/TrackedContainer.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputWithDebouncing from "react-input-with-debouncing";
import axios from "axios";

export default function Search({ header, open, select, item }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(!header);
  const [resultLength, setResultLength] = useState(0);
  const [items, setItems] = useState([
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
  ]);

  useEffect(() => {
    getFiltered(1, "").then(() => {
      setIsLoading(false);
    });
  }, []);

  const inFocus = (focus) => {
    if (header) {
      if (focus) {
        getFiltered(1, searchTerm);
      }

      // scuffed way to ensure click goes through on button before buttons disappear
      setTimeout(() => setFocused(focus), 100);
    }
  };

  const pageChange = (number) => {
    let newPage = page + number;
    setPage(newPage);
    getFiltered(newPage, searchTerm);
  };

  const getFiltered = async (page, text) => {
    setIsLoading(true);
    const res = await axios.get("/api/search/all", {
      params: { text: text, page: page },
    });

    res.data.page.forEach((item) => {
      if (item.abbreviation !== undefined) {
        item.type = "country";
        if (item.name === "Global") {
          item.url =
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg";
        } else {
          item.url =
            "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
            item.abbreviation +
            ".svg";
        }
      } else {
        item.type = "user";
        item.url = "http://s.ppy.sh/a/" + item.id;
      }
    });

    setItems(res.data.page);
    setResultLength(res.data.length);
    setIsLoading(false);
  };

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    getFiltered(1, e.target.value);
  };

  return (
    <div className="flex flex-col items-center z-20">
      <div className="flex flex-col w-full p-1 rounded items-center">
        <div className="relative text-gray-600">
          <InputWithDebouncing
            type="search"
            placeholder={
              item?.name
                ? item.data && item.user
                  ? item.data[item.data.length - 1].player
                  : item.name
                : "Player or Country"
            }
            value={searchTerm}
            onChange={editSearchTerm}
            debounceTimeout={250}
            onFocus={() => inFocus(true)}
            onBlur={() => inFocus(false)}
            className="bg-white xl:w-full w-52 h-10 px-5 z-0 pr-10 rounded-full border-gray-400 border text-sm focus:outline-none"
          />
          <div className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </div>
        </div>
        {!header && isLoading ? (
          <div className="flex w-full h-32 justify-center">
            <CircularProgress className="self-center" size="5rem" />
          </div>
        ) : !(header && !focused) ? (
          <div className="w-full mt-2 z-50">
            <TrackedContainer
              items={items}
              open={open}
              select={select}
              item={item}
            />
          </div>
        ) : null}
        {!header && !isLoading ? (
          <div className="bg-main-one flex mt-2 w-40 justify-between items-center p-1 rounded shadow">
            <div
              className={`${
                page > 1 ? "block" : "invisible"
              } hover:bg-blue-500 bg-main-four cursor-pointer select-none text-sm rounded py-1 px-2 font-semibold`}
              onClick={() => pageChange(-1)}
            >
              Prev
            </div>
            <div className="font-semibold">
              {(page - 1) * 5 + 1 + "-" + page * 5}
            </div>
            <div
              className={`${
                page * 5 < resultLength ? "block" : "invisible"
              } hover:bg-blue-500 bg-main-four cursor-pointer select-none text-sm rounded py-1 px-2 font-semibold`}
              onClick={() => pageChange(1)}
            >
              Next
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
