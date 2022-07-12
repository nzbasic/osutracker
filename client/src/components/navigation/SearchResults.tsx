import { GenericSummary } from "../../../../interfaces/search";
import { CompareData } from "../pages/Compare";

interface Props { 
    results: GenericSummary[] | undefined, 
    loading: boolean, 
    select?: (selected: GenericSummary, itemToChange: CompareData) => void 
    item?: CompareData
}

export const SearchResults = ({ results, loading, select, item }: Props) => { 

    const parseLink = (item: GenericSummary) => {
        if (item.type === "country") {
            return "/country/" + item.name;
        } else {
            return "/user/" + item.id
        }
    }

    const goto = (result: GenericSummary) => {
        if (select && item) {
            select(result, item)
        } else {
            window.location.href = parseLink(result)
        }
    }

    return (
        <div className="flex flex-col gap-1 p-1 w-full dark:bg-dark03 dark:border-black border-blue-400 z-50 border rounded shadow-sm">
            {loading ? (
                Array.from(Array(5).keys()).map(i => (
                    <div key={i} className="w-full p-2">Loading...</div>
                ))
            ) : (
                results && results.length ? results.map((result, index) => (
                    <button onClick={() => goto(result)} className="flex items-center justify-between p-2 hover:text-white hover:bg-blue-400 dark:hover:bg-blue-500 transition rounded-sm cursor-pointer" key={index}>
                        <span className="">{result.name}</span>
                        <span className="">{parseInt(result.pp)}pp</span>
                    </button>
                )) : <span className="p-2 text-center">No Results!</span>
            )}
        </div>
    );
};
