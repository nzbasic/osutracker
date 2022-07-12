import { CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { Beatmap } from '../../../../models/Beatmap.model'

export const TopPlay = ({ id }: { id: string }) => {
  const [play, setPlay] = useState<Beatmap>()

  useEffect(() => {
    axios.get<Beatmap>("/api/stats/mapset/" + id).then(res => {
      setPlay(res.data)
    })
  }, [id])

  return (
    <div className="flex">
      {play ? (
        <a 
          target="_blank"
          rel="noreferrer" 
          href={"https://osu.ppy.sh/beatmaps/" + play.id}
          className="hover:underline"
        >
          {play.name}
        </a>  
      ) : <CircularProgress /> }
    </div>
  )
}