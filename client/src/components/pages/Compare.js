import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import Search from "../molecules/Search.js";
import stc from "string-to-color";
import axios from "axios";
import CompareGraph from "../molecules/CompareGraph.js";
import { CircularProgress } from "@material-ui/core";
import GraphDropdown from "../molecules/GraphDropdown.js";

const defaultCompare = [
  { name: "", added: false, id: uuidv4() },
  { name: "", added: false, id: uuidv4() },
];

export default function Compare() {
  const [compare, setCompare] = useState([]);
  const [adding, setAdding] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [noGet, setNoGet] = useState(false);
  const [length, setLength] = useState(0);
  const [graphType, setGraphType] = useState("pp");
  const [reversed, setReversed] = useState(false);
  const maxCompare = 50;

  useEffect(() => {
    document.title = "Compare";

    const urlParams = queryString.parse(window.location.search, {
      arrayFormatSeparator: ",",
      arrayFormat: "bracket-separator",
      parseNumbers: true,
    });

    let params = [];

    // migrate old params
    const oldParams = ["one", "two", "three", "four", "five"];
    oldParams.forEach((param) => {
      if (urlParams[param]) {
        params.push(urlParams[param]);
      }
    });

    for (let i = 0; i < maxCompare; i++) {
      if (urlParams[`${i}`]) {
        params.push(urlParams[`${i}`]);
      }
    }

    if (params.length === 0) {
      params.push("");
    }

    if (Array.isArray(params ?? 0)) {
      params = Array.from(new Set(params));

      const data = [];
      params.forEach((item) => {
        if (!Number.isNaN(parseInt(item))) {
          item = parseInt(item);
        }
        console.log(item);

        const value = {
          name: item,
          user: false,
          added: true,
          id: uuidv4(),
        };

        if (typeof item == "number") {
          value.user = true;
        } else {
          value.added = item !== "";
        }

        data.push(value);
      });

      setCompare(data.slice(0, maxCompare));
      setGraphType("pp");
    } else {
      setLoading(false);
      setCompare(defaultCompare);
      setAdding(false);
    }
  }, []);

  useEffect(() => {
    if (compare.length) {
      let string = "?";

      compare.forEach((item, index) => {
        item.name = item.name ?? "";
        string += index + 1 + "=" + item.name + "&";
      });

      window.history.replaceState(null, "Compare", string);

      if (!noGet) {
        const promises = [];
        let count = 0;
        compare.forEach((item) => {
          if (!item.name) {
            return;
          }

          count++;
          let header = {};
          if (item.user) {
            header.promise = axios.get("/api/users/" + item.name + "/stats");
            header.user = true;
          } else {
            header.promise = axios.get(
              "/api/countries/" + item.name + "/stats"
            );
            header.user = false;
          }

          promises.push(header);
        });

        Promise.all(
          promises.map((header) => {
            return header.promise.then((res) =>
              handleData(res.data, header.user)
            );
          })
        ).then(() => {
          setLoading(false);
        });

        const handleData = (data, user) => {
          if (data.length) {
            const item = compare.find(
              ({ name }) =>
                name === (user ? parseInt(data[0].id) : data[0].name)
            );

            if (item) {
              item.data = data;
            }
          }
        };
        setLength(count);
      }
      setNoGet(false);
    }
  }, [compare, noGet]);

  const addNew = () => {
    const newItem = {
      name: "",
      user: false,
      added: false,
      id: uuidv4(),
    };

    setNoGet(true);
    setCompare([...compare, newItem]);
  };

  const remove = (toRemove) => {
    const removed = compare.filter((item) => item.id !== toRemove.id);
    setNoGet(true);
    setCompare(removed);
  };

  const select = (selected, itemToChange) => {
    const user = selected.type === "user";

    itemToChange.name = user ? parseInt(selected.id) : selected.name;
    itemToChange.user = user;
    itemToChange.added = true;

    setNoGet(false);
    setLoading(true);
    setCompare([...compare]);
  };

  const graphChange = (e) => {
    setGraphType(e.value);
    setReversed(e.reversed);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="lg:mt-4 mt-16">
        {!isLoading && length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <GraphDropdown onChange={graphChange} selected={graphType} />
            </div>
            <CompareGraph
              compare={compare}
              type={graphType}
              reversed={reversed}
            />
          </div>
        ) : length > 0 ? (
          <div>
            <div className="hidden lg:block">
              <CircularProgress className="self-center" size="37rem" />
            </div>
            <div className="block lg:hidden">
              <CircularProgress className="self-center" size="15rem" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col bg-white lg:w-graph w-smgraph mt-4 p-4 shadow-md rounded-md">
        <span className="text-xl mb-4 w-full text-center">Comparing:</span>

        {compare.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-row lg:ml-8 py-2 max-h-12 overflow-visible"
          >
            <div className="flex flex-row items-center mt-3">
              <span
                onClick={() => remove(item)}
                className="mr-2 text-center text-white bg-red-500 hover:bg-red-700 rounded-sm px-2 cursor-pointer"
              >
                x
              </span>
              <span className="w-4">{index + 1}</span>
            </div>

            <div className={`ml-2`}>
              <Search header={true} open={false} select={select} item={item} />
            </div>

            <div
              className="h-4 w-4 mt-4 ml-2"
              style={{
                backgroundColor: stc(
                  item.user
                    ? item.data
                      ? item.data[item.data.length - 1].player
                      : item.name
                    : item.name
                ),
              }}
            ></div>

            <div
              className={`${
                isLoading || item.name === "" ? "md:hidden" : ""
              } hidden md:flex flex-row mt-3 ml-4 space-x-4`}
            >
              <span>
                {item.data ? parseInt(item.data[item.data.length - 1].pp) : 0}pp
              </span>
              <span
                className={`${!item.user ? "lg:hidden" : ""} hidden lg:block`}
              >
                #{item.data ? item.data[item.data.length - 1].rank : 0}
              </span>
              <span className={`${!item.user ? "hidden" : ""}`}>
                {item.data ? item.data[item.data.length - 1].plays : 0} plays
              </span>
              <span className="hidden xl:block">
                {item.data ? item.data[item.data.length - 1].farm : 0}% Farm
              </span>
              <span>
                {item.data
                  ? parseFloat(
                      item.data[item.data.length - 1].acc < 1
                        ? item.data[item.data.length - 1].acc * 100
                        : item.data[item.data.length - 1].acc
                    ).toFixed(2)
                  : 0}
                % Acc
              </span>
            </div>
          </div>
        ))}

        {compare.length + adding < maxCompare ? (
          <div className="flex flex-row mt-4 lg:ml-8">
            <span
              onClick={addNew}
              className="z-0 cursor-pointer select-none bg-main-four px-2 rounded-md hover:bg-blue-400 font-semibold"
            >
              +
            </span>
          </div>
        ) : (
          <div className="mb-4"></div>
        )}
      </div>
    </div>
  );
}
