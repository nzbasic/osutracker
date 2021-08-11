import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { preventOverflow } from "../../util/text.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

export default function UserTable({
  items,
  headers,
  serverSidePagination,
  url,
}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(serverSidePagination ?? false);
  const [numberResults, setNumberResults] = useState(0);
  const [sort, setSort] = useState({ name: "pp", order: "desc" });

  const handleData = (data) => {
    setNumberResults(data.numberResults);
    setData(data.data);
    setLoading(false);
  };

  const handleSort = (event) => {
    let newSort;
    if (event === sort.name) {
      if (sort.order === "desc") {
        newSort = { name: event, order: "asc" };
      } else {
        newSort = { name: event, order: "desc" };
      }
    } else {
      newSort = { name: event, order: "desc" };
    }

    if (!serverSidePagination) {
      items = items.sort((a, b) => {
        if (newSort.order === "asc") {
          let temp = a;
          a = b;
          b = temp;
        }

        if (newSort.name === "name") {
          return a.name.localeCompare(b.name);
        }

        return parseFloat(b[newSort.name]) - parseFloat(a[newSort.name]);
      });
    }

    setSort(newSort);
    changePage(-(page - 1));
  };

  const changePage = (number) => {
    setPage(page + number);

    if (serverSidePagination) {
      setLoading(true);
    } else {
      setData(items.slice((page + number - 1) * 50, (page + number) * 50));
    }
  };

  useEffect(() => {
    if (serverSidePagination) {
      axios
        .get(url, {
          params: { name: sort.name, order: sort.order, page: page },
        })
        .then((res) => handleData(res.data));
    }
  }, [sort, page, serverSidePagination, url]);

  useEffect(() => {
    document.title = "All Players";

    if (serverSidePagination) {
      const usersPromise = axios.get(url, {
        params: { name: "pp", order: "desc", page: 1 },
      });

      Promise.all([usersPromise.then((res) => handleData(res.data))]).then(() =>
        setLoading(false)
      );
    }
  }, [serverSidePagination, url]);

  useEffect(() => {
    if (!serverSidePagination) {
      setData(items.slice(0, 50));
      setNumberResults(items.length);
    }
  }, [items, serverSidePagination]);

  return isLoading ? (
    <div className="h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="mt-16 lg:mt-4 flex flex-col w-full items-center">
      <div className="bg-main-one shadow-md rounded-md p-2 font-semibold flex space-x-2 items-center">
        <div
          className={`${
            page > 1 ? "block" : "invisible"
          } hover:bg-blue-500 bg-main-four cursor-pointer select-none text-sm rounded py-1 px-2 font-semibold`}
          onClick={() => changePage(-1)}
        >
          Prev
        </div>
        <div className="select-none">
          Showing {(page - 1) * 50 + 1 + "-" + page * 50}
        </div>
        <div
          className={`${
            page * 50 < numberResults ? "block" : "invisible"
          } hover:bg-blue-500 bg-main-four cursor-pointer select-none text-sm rounded py-1 px-2 font-semibold`}
          onClick={() => changePage(1)}
        >
          Next
        </div>
      </div>
      <div className="flex space-x-1 m-4 text-xs md:text-base">
        {headers.map((header) => (
          <div
            key={header.title}
            className={`${
              header.mobile ? "flex" : "hidden md:flex"
            } flex-col space-y-2`}
          >
            <div
              className={
                "hover:underline cursor-pointer bg-main-one shadow-md rounded-md px-2 py-1 text-center"
              }
              onClick={() => handleSort(header.sortBy)}
            >
              {header.title}
            </div>
            <div>
              {data.map((user, index) => (
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
                        <span className="lg:hidden">
                          {preventOverflow(user[header.sortBy], 12)}
                        </span>
                        <span className="hidden lg:block">
                          {preventOverflow(user[header.sortBy], 12)}
                        </span>
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
