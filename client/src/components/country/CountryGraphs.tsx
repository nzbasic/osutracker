import { CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { CountryStat } from "../../../../models/CountryStat.model"
import GraphDropdown, { Option } from '../graphs/GraphDropdown'
import { TimeSeriesChart } from "../graphs/TimeSeriesChart"
import { GraphData } from "../graphs/util"

export const countryOptions: Option[] = [
    { value: "pp", label: "Performance", reversed: false },
    { value: "acc", label: "Accuracy", reversed: false },
    { value: "farm", label: "Farm", reversed: false },
    { value: "range", label: "Range", reversed: false },
    { value: "playerWeighting", label: "Player Weighted pp", reversed: false },
  ];

export const CountryGraphs = ({ name }: { name: string }) => {
    const [graphDataMap, setGraphDataMap] = useState<Map<string, GraphData[]>>(new Map())
    const [isLoading, setLoading] = useState(true)
    const [graphType, setGraphType] = useState<Option>(countryOptions[0])

    const graphChange = (e: Option | null) => {
        setGraphType(e??countryOptions[0])
    }

    useEffect(() => {
        axios.get<CountryStat[]>(`/api/countries/${name}/stats`).then(res => {
            const map = new Map<string, GraphData[]>()
            for (const stat of res.data) {
                const date = stat.date;

                const obj: any = {
                    "acc": stat.acc === 0 ? null : stat.acc,
                    "pp": parseInt(stat.pp),
                }

                // these were added in later versions so are not present in older data
                obj["farm"] = stat?.farm??null
                obj["range"] = stat?.range??null
                obj["playerWeighting"] = stat?.playerWeighting??null

                for (const key of Object.keys(obj)) {
                    if (obj[key] == null) continue
                    map.set(key, (map.get(key)??[]).concat({ x: date, y: obj[key] }));
                }
            }

            for (const key of map.keys()) {
                map.set(key, (map.get(key)??[]).sort((a, b) => a.x - b.x))
            }

            setGraphDataMap(map)
            setLoading(false)
        })
    }, [name])

    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-full border border-black rounded dark:bg-dark03">
                <div className="border-b py-2 border-black flex items-center justify-center font-medium z-20">
                    <GraphDropdown onChange={graphChange} options={countryOptions} selected={graphType} />
                </div>
                <div className="w-full h-full pb-1 flex flex-col items-center justify-center px-2 z-10">
                    {isLoading ? <CircularProgress /> : <TimeSeriesChart chartData={graphDataMap.get(graphType.value)??[]} reversed={!!graphType.reversed} /> }
                </div>
            </div>
        </div>
    )
}