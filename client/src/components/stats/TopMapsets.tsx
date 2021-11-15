import { useEffect, useState } from "react"
import { SetCount } from "../../../../models/OverallStats.model"
import { CircularProgress } from "@material-ui/core"
import axios from "axios"

interface Beatmap {
    name: string,
    mapper: string
}

export const TopMapsets = ({ sets }: { sets: SetCount[] }) => {
    const [fullSets, setFullSets] = useState<Beatmap[]>([])

    useEffect(() => { 
        const setIdArray = sets.map(item => item.setId)
        const batchNumber = 100
        const batches = Math.ceil(setIdArray.length / batchNumber)
        const allMaps: Beatmap[] = []

        const fetchData = async () => {
            for (let i = 0; i < batches; i++) {
                const data = await axios.get<Beatmap[]>("/api/stats/mapsets", {
                    params: { arr: setIdArray.slice(i * batchNumber, (i + 1) * batchNumber) }
                })
                allMaps.push(...data.data)
            }
        }

        fetchData().then(res => {
            setFullSets(allMaps)
        })
    }, [sets])

    return  (
        <div className="flex flex-col gap-1 min-w-0">
            {fullSets.length ? (
                fullSets.map((item, index) => (
                    <a 
                        target="_blank"
                        rel="noreferrer" 
                        href={"https://osu.ppy.sh/beatmapsets/" + sets[index].setId}
                        className="hover:underline flex gap-1 min-w-0 dark:text-white text-xs md:text-base"
                    >
                        <span className="force-w8 md:force-w12">#{index+1}</span>
                        <div className="flex gap-1 min-w-0 w-full">
                            <span className="truncate">{item.mapper} -</span>
                            <span className="truncate">{item.name.replace(/(\[(.*?)\])$/g, "")}</span>
                        </div>
                       
                        <span className="force-w8">{sets[index].count}</span>
                    </a>
                ))
            ) : <CircularProgress />}
        </div>
    ) 
}