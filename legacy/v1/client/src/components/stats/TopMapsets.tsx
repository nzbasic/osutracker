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
    
    const fetchData = async () => {
      const allMaps: Beatmap[] = []
      for (let i = 0; i < batches; i++) {
        const data = await axios.get<Beatmap[]>("/api/stats/mapsets", {
          params: { arr: setIdArray.slice(i * batchNumber, (i + 1) * batchNumber) }
        })
        allMaps.push(...data.data)
      }

      return allMaps
    }

    fetchData().then(res => {
      setFullSets(res)
    })
  }, [sets])
  
  return  (
    <div className="maps-grid min-w-0 text-xs md:text-base">
      {fullSets.length ? (
        fullSets.map((item, index) => (
          <>
            <span>#{index+1}</span>
            <a 
              target="_blank"
              rel="noreferrer" 
              href={"https://osu.ppy.sh/beatmapsets/" + sets[index].setId}
              className="hover:underline flex gap-1 w-full min-w-0 dark:text-white"
            >
              <span className="truncate hidden md:block">{item.mapper} -</span>
              <span className="truncate">{item.name.replace(/(\[(.*?)\])$/g, "")}</span>
            </a>
            
            <span className="flex justify-end">{sets[index].count}</span>
          </>
        ))
      ) : <CircularProgress />}
    </div>
  ) 
}