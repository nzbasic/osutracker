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
                    <div className="min-w-0 w-full maps-grid text-xs md:text-base">
                        {item.list.map((barrier, index) => (
                            <>
                                <span className="">#{index+1}</span>
                                <a target="_blank" rel="noreferrer" href={"https://osu.ppy.sh/beatmaps/" + barrier.id} className="w-full truncate hover:underline">{barrier.name}</a>
                                <div className="flex justify-end">{barrier.count}</div>
                            </>
                        ))}
                    </div>
                </SimpleSummaryAccordion>
            )) : <CircularProgress />}
        </div>
    )
}