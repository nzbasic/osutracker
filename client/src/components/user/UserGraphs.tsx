import { CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { UserStat } from "../../../../models/UserStat.model"
import GraphDropdown, { Option } from '../graphs/GraphDropdown'
import { TimeSeriesChart } from "../graphs/TimeSeriesChart"
import { GraphData } from "../graphs/util"

export const userOptions: Option[] = [
    { value: "pp", label: "Performance" },
    { value: "rank", label: "Rank", reversed: true },
    { value: "acc", label: "Accuracy" },
    { value: "plays", label: "Play Count" },
    { value: "farm", label: "Farm" },
    { value: "range", label: "Range" },
    { value: "score", label: "Score" },
    { value: "countryRank", label: "Country Rank", reversed: true },
]

export const UserGraphs = ({ id }: { id: string }) => {
    const [graphDataMap, setGraphDataMap] = useState<Map<string, GraphData[]>>(new Map())
    const [isLoading, setLoading] = useState(true)
    const [graphType, setGraphType] = useState<Option>(userOptions[0])

    const graphChange = (e: Option | null) => {
        setGraphType(e??userOptions[0])
    }

    useEffect(() => {
        axios.get<UserStat[]>(`/api/users/${id}/stats`).then(res => {
            const map = new Map<string, GraphData[]>()
            for (const stat of res.data) {
                const date = stat.date;

                const obj: any = {
                    "acc": Math.round((parseFloat(stat.acc) + Number.EPSILON) * 100) / 100,
                    "plays": parseInt(stat.plays),
                    "pp": parseInt(stat.pp),
                    "rank": parseInt(stat.rank),
                }

                // these were added in later versions so are not present in older data
                obj["countryRank"] = stat?.countryRank??null
                obj["farm"] = stat?.farm??null
                obj["range"] = stat?.range??null
                obj["score"] = stat?.score??null

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
    }, [id])

    return (
        <div className="w-full h-full px-4">
            <div className="flex flex-col h-full border border-black rounded dark:bg-dark03">
                <div className="border-b py-2 border-black flex items-center justify-center font-medium z-20">
                    <GraphDropdown onChange={graphChange} options={userOptions} selected={graphType} />
                </div>
                <div className="w-full h-full pb-1 flex flex-col items-center justify-center px-2 z-10">
                    {isLoading ? <CircularProgress /> : <TimeSeriesChart chartData={graphDataMap.get(graphType.value)??[]} reversed={!!graphType.reversed} /> }
                </div>
            </div>
        </div>
    )
}