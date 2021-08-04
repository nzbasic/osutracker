import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { v4 as uuidv4 } from "uuid";
import Search from "../molecules/Search.js";
import clonedeep from "lodash/cloneDeep";
import stc from "string-to-color";
import axios from "axios";
import CompareGraph from "../molecules/CompareGraph.js";
import { CircularProgress } from "@material-ui/core";
import GraphDropdown from "../molecules/GraphDropdown.js";

export default function Compare() {
  const [compare, setCompare] = useState([]);
  const [adding, setAdding] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [noGet, setNoGet] = useState(false);
  const [length, setLength] = useState(0);
  const [graphType, setGraphType] = useState("pp");
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    document.title = "Compare";

    const urlParams = queryString.parse(window.location.search, {
      arrayFormatSeparator: ",",
      arrayFormat: "bracket-separator",
      parseNumbers: true,
    });

    if (Array.isArray(urlParams.u ?? 0)) {
      urlParams.u = Array.from(new Set(urlParams.u));

      const data = [];
      urlParams.u.forEach((item) => {
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

      setCompare(data.slice(0, 5));
    } else {
      setAdding(false);
    }
  }, []);

  useEffect(() => {
    if (compare.length) {
      let string = "?";
      compare.forEach((item) => {
        string += `u[]=${item.name ?? ""}&`;
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
      item: "",
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
    const clone = clonedeep(compare);
    clone.forEach((item) => {
      const user = selected.type === "user";

      if (item.name === itemToChange.name) {
        item.name = user ? parseInt(selected.id) : selected.name;
        item.user = user;
        item.added = true;
      }
    });

    setNoGet(false);
    setLoading(true);
    setCompare(clone);
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
        ) : (
          <CircularProgress className="self-center" size="10rem" />
        )}
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
                className="mr-4 text-red-600 cursor-pointer"
              >
                x
              </span>
              {index + 1}
            </div>

            <div className={`z-${(5 - index) * 10} ml-4`}>
              <Search header={true} open={false} select={select} item={item} />
            </div>

            <div
              className="h-4 w-4 mt-4 ml-2"
              style={{
                backgroundColor: stc(
                  item.data ? item.data[item.data.length - 1].player : item.name
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

        {compare.length + adding < 5 ? (
          <div className="flex flex-row w-full justify-center mt-4">
            <span onClick={addNew} className="cursor-pointer select-none">
              + Add New to Compare
            </span>
          </div>
        ) : (
          <div className="mb-4"></div>
        )}
      </div>
    </div>
  );
}
