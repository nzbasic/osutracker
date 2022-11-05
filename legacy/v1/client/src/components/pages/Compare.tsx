import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosResponse } from "axios";
import { Country } from "../../../../models/Country.model";
import { User } from "../../../../models/User.model";
import { parseUrl } from "../../util/parseUrl";
import { SimpleSummaryAccordion } from "../misc/SimpleSummaryAccordion";
import { UserStat } from "../../../../models/UserStat.model";
import { CountryStat } from "../../../../models/CountryStat.model";
import { userOptions } from "../user/UserGraphs";
import { countryOptions } from "../country/CountryGraphs";
import CompareGraph from "../graphs/CompareGraph";
import GraphDropdown, { Option } from "../graphs/GraphDropdown";
import { CircularProgress } from "@material-ui/core";
import { Search } from "../navigation/Search";
import stc from "string-to-color";
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { GenericSummary } from "../../../../interfaces/search";
import { Helmet } from "react-helmet";

export interface CompareData {
  name: string;
  added: boolean;
  id: string;
  user: boolean;
  data?: any[];
}

const defaultCompare: CompareData[] = [
  { name: "", added: false, id: uuidv4(), user: true },
  { name: "", added: false, id: uuidv4(), user: true },
];

export const Compare = () => {
  const [compare, setCompare] = useState<CompareData[]>([]);
  const [adding, setAdding] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [noGet, setNoGet] = useState(false);
  const [length, setLength] = useState(0);
  const [graphType, setGraphType] = useState<Option>(userOptions[0]);
  const [fixedLink, setFixedLink] = useState(false);
  const maxCompare = 50;

  // kind of a mess. there are 3 "modes" of the compare view, the main one is just having
  // the user enter any users/countries they want to compare, the other two are fixed links
  // for the top 10 players and the top 10 countries.
  useEffect(() => {
    document.title = "Compare";
    const urlOptions = parseUrl();

    if (urlOptions.topUsers) {
      setFixedLink(true);
      axios.get<User[]>("/api/users/topUserIds").then((res) => {
        const data = res.data;
        setCompare(
          data.map((user) => ({
            name: user.id,
            user: true,
            added: true,
            id: uuidv4(),
          }))
        );
      });
    } else if (urlOptions.topCountries) {
      setFixedLink(true);
      axios.get<Country[]>("/api/countries/limitedAll").then((res) => {
        const data = res.data
          .sort((a, b) => b.playerWeighting - a.playerWeighting)
          .slice(1, 11);
        setCompare(
          data.map((country) => ({
            name: country.name,
            user: false,
            added: true,
            id: uuidv4(),
          }))
        );
      });
    } else {
      if (urlOptions.users.length + urlOptions.countries.length < 2) {
        setCompare(defaultCompare);
        setLoading(false);
        setAdding(0);
      } else {
        const compareData: CompareData[] = [];
        for (const user of urlOptions.users) {
          compareData.push({
            name: user.toString(),
            user: true,
            added: true,
            id: uuidv4(),
          });
        }

        for (const country of urlOptions.countries) {
          compareData.push({
            name: country,
            user: false,
            added: true,
            id: uuidv4(),
          });
        }

        setCompare(compareData);
        setGraphType(userOptions[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (compare.length) {
      // this will update the url to reflect the compare list without refreshing the page
      if (!fixedLink) {
        let string = "?";

        compare.forEach((item, index) => {
          item.name = item.name ?? "";
          string += index + 1 + "=" + item.name + "&";
        });

        window.history.replaceState(null, "Compare", string);
      }

      // noGet is true if ???
      if (!noGet) {
        let count = 0;
        const promises: {
          promise: Promise<AxiosResponse<CountryStat[] | UserStat[]>>;
          user: boolean;
        }[] = [];
        compare.forEach((item) => {
          if (!item.name) {
            return;
          }

          count++;
          let header: {
            promise: Promise<AxiosResponse<CountryStat[] | UserStat[]>>;
            user: boolean;
          };
          if (item.user) {
            header = {
              promise: axios.get<UserStat[]>(`/api/users/${item.name}/stats`),
              user: true,
            };
          } else {
            header = {
              promise: axios.get<CountryStat[]>(`/api/countries/${item.name}/stats`),
              user: false,
            };
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

        const handleData = (
          data: CountryStat[] | UserStat[],
          user: boolean
        ) => {
          if (data.length) {
            const item = compare.find(
              ({ name }) =>
                name ===
                (user
                  ? (data[0] as UserStat).id
                  : (data[0] as CountryStat).name)
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
  }, [compare, noGet, fixedLink]);

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

  const remove = (toRemove: CompareData) => {
    const removed = compare.filter((item) => item.id !== toRemove.id);
    setNoGet(true);
    setCompare(removed);
  };

  const select = (selected: GenericSummary, itemToChange: CompareData) => {
    const user = selected.type === "user";

    itemToChange.name = user ? selected.id : selected.name;
    itemToChange.user = user;
    itemToChange.added = true;

    setNoGet(false);
    setLoading(true);
    setCompare([...compare]);
  };

  const graphChange = (e: Option) => {
    setGraphType(e);
  };

  const options = () => {
    const table = [];

    if (compare.find((item) => item.user)) {
      table.push(...userOptions);
    }

    if (compare.find((item) => !item.user)) {
      table.push(...countryOptions);
    }

    return table;
  };

  return (
    <div className="main-container flex flex-col p-4 md:p-8 gap-2 md:gap-4">
      <Helmet>
        <meta property="og:title" content="Compare Users and Countries" />
        <meta
          property="og:description"
          content="Compare the historical performance, accuracy, rank and playtime of users and countries."
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
        />
        <meta
          name="twitter:image"
          content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
        />
        <meta name="twitter:title" content="Compare Users and Countries" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Compare the historical performance, accuracy, rank and playtime of users and countries."
        />
      </Helmet>
      <div className="flex items-center gap-2 text-xs">
        <span className="md:text-lg">Load Default:</span>
        <a
          href="/compare/topUsers"
          className="p-1 button button-green flex items-center justify-center"
        >
          Top 10 Users
        </a>
        <a
          href="/compare/topCountries"
          className="p-1 button button-green flex items-center justify-center"
        >
          Top 10 Countries
        </a>
      </div>
      <SimpleSummaryAccordion title="Compare" expanded>
        <div className="dark:text-white flex flex-col gap-1 w-full mt-2">
          {compare.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 w-full">
              <button 
                onClick={() => remove(item)}
                className="text-white px-1 py-1 rounded bg-red-500 hover:bg-red-400 transition ease-in"
              >
                <CloseIcon />
              </button>
              <div className="w-60 min-w-60">
                <Search
                  select={select}
                  item={item}
                  text={
                    item.user
                      ? item.data
                        ? item.data[item.data.length - 1].player
                        : item.name
                      : item.name
                  }
                />
              </div>
              {item.data && (
                <div className="flex items-center justify-between w-full pr-8 pl-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4"
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
                    {item.user && <span className="w-8 hidden lg:block">#{item.data[item.data.length - 1].rank}</span>}
                  </div>
                  <div className="items-center gap-2 hidden lg:flex">
                    <span className="w-16">
                      {parseFloat(item.data[item.data.length - 1].pp).toFixed(0)}pp
                    </span>
                    {item.user ? (
                      <span className="w-8">{parseFloat(item.data[item.data.length - 1].acc).toFixed(2)}%</span>
                    ) : (
                      <span className="w-8">{(parseFloat(item.data[item.data.length - 1].acc) * 100).toFixed(2)}%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {((compare.length + adding) < maxCompare) && (
            <button 
              onClick={addNew}
              className="text-white bg-blue-400 dark:bg-blue-500 my-2 ml-10 w-60 h-8 rounded flex justify-center items-center"
            >
              <AddIcon />
            </button>
          )}

        </div>
      </SimpleSummaryAccordion>

      {length > 0 &&
        <div className="w-full h-full">
          <div className="flex flex-col h-full border border-black rounded dark:bg-dark03">
            <div className="border-b py-2 border-black flex items-center justify-center font-medium z-20">
              <GraphDropdown
                options={options()}
                selected={graphType}
                onChange={(o: Option | null) => graphChange(o ?? options()[0])}
              />
            </div>
            <div className="w-full h-full pb-1 flex flex-col items-center justify-center px-2 z-10">
                {isLoading ? (
                  <div className="py-4 mt-2"><CircularProgress /></div>
                ) : (
                  <CompareGraph
                    compare={compare}
                    type={graphType.value}
                    reversed={!!graphType.reversed}
                  />
                )}
            </div>
          </div>
        </div>
      }
    </div>
  );
};
