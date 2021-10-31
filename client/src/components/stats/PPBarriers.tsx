import { CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { PPBarrierRes } from '../../../../interfaces/stats'
import { SimpleSummaryAccordion } from "../misc/SimpleSummaryAccordion"

export const PPBarriers = () => {
    const [data, setData] = useState<PPBarrierRes[]>([])

    useEffect(() => {
        axios.get<PPBarrierRes[]>("/api/stats/ppBarrier").then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <div className="flex flex-col mt-2">
            {data.length ? data.sort((a,b) => a.number - b.number).map((item, index) => (
                <SimpleSummaryAccordion key={index} title={item.number + "pp"}>
                    <div className="flex flex-col min-w-0">
                        {item.list.map((barrier, index) => (
                            <div key={index} className="flex flex-row gap-2 items-center min-w-0 dark:text-white">
                                <span className="w-8">#{index+1}</span>
                                <a target="_blank" rel="noreferrer" href={"https://osu.ppy.sh/beatmaps/" + barrier.id} className="truncate hover:underline">{barrier.name}</a>
                                <div className="">{barrier.count}</div>
                            </div>
                        ))}
                    </div>
                </SimpleSummaryAccordion>
            )) : <CircularProgress />}
        </div>
    )
}