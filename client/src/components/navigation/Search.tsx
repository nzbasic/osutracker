import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { useDebounce } from "use-debounce/lib";
import { GenericSummary, SearchRes } from "../../../../interfaces/search";
import { CompareData } from "../pages/Compare";
import { SearchResults } from "./SearchResults";

interface Props { 
  alwaysFocused?: boolean, 
  text?: string, 
  select?: (selected: GenericSummary, itemToChange: CompareData) => void 
  item?: CompareData
}

export const Search = ({ alwaysFocused, text, select, item }: Props) => {
  const [results, setResults] = useState<GenericSummary[]>();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(alwaysFocused ? true : false);
  const [debouncedSearchTerm] = useDebounce(search, 250)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getFiltered(1, "");
  }, []);

  useEffect(() => {
    getFiltered(1, debouncedSearchTerm);
  }, [debouncedSearchTerm])

  const toggleFocus = (on: boolean) => {
    if (!alwaysFocused) {
        setTimeout(() => setFocused(on), 150);
    }
  }

  const getFiltered = async (page: number, text: string) => {
    setLoading(true)
    const res = await axios.get<SearchRes>(
      `/api/search/all?page=${page}&text=${text}`
    );

    for (const item of res.data.page) {
      if (item.type === "country") {
        if (item.name === "Global") {
          item.url =
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg";
        } else {
          item.url =
            "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
            item.id +
            ".svg";
        }
      } else {
        item.url = "http://s.ppy.sh/a/" + item.id;
      }
    }

    setLoading(false)
    setResults(res.data.page);
  };

  return (
      <div className="flex flex-col w-full relative">
        <div className="flex items-center -ml-5 z-0">
            <SearchIcon
                className="relative left-8 z-10 text-blue-400 dark:text-blue-500"
                fontSize="small"
            />
            <input
                className={`${alwaysFocused ? 'dark:bg-dark02' : 'dark:bg-dark01'} z-0 rounded-md h-9 border-gray-200 border-2 pl-9 text-gray-900 dark:text-white dark:border-transparent w-full`}
                onFocus={() => toggleFocus(true)}
                onBlur={() => toggleFocus(false)}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={text ? text : "Search..."}
            />
        </div>
        <Animated className="z-50" animationIn={"fadeIn"} animationOut={"fadeOut"} isVisible={focused} animateOnMount={false} animationOutDuration={250} animationInDuration={250} >
            <div className={`${alwaysFocused ? 'static mt-2' : 'absolute'} bg-white rounded-md shadow-md top-10 w-60 z-50`}>
                <SearchResults select={select} item={item} results={results} loading={isLoading} />
            </div>
        </Animated>
      </div>
  );
};
