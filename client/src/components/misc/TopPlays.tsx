import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlays as UserPlaysModel } from '../../../../models/UserPlays.model'
import { Score } from "../../../../models/Score";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { TopPlaysDatePicker } from './TopPlaysDatePicker'

interface PlaysHistory {
  scores: Score[]
  date: number
} 

export const TopPlays = ({ currentTop, path, country }: { path: string, currentTop: Score[], country?: true }) => {
  const [playsHistory, setPlaysHistory] = useState<PlaysHistory[]>([])
  const [index, setIndex] = useState(-1);
  const [isLoading, setLoading] = useState(true)
  const [unique, setUnique] = useState(false)

  const scoreEquator = (a: Score, b: Score) => {
    return a.acc === b.acc && a.id === b.id && a.pp === b.pp
  }

  // plays history is stored as deltas in the database, so each change has some [added] and [removed] plays with an associated date
  // we need to construct the actual history from this
  // example:
  // We have user details which contains the current top plays
  // We have a plays history with 1 change
  // The result will be a history array with two elements containing a list of the top plays and the date of the change

  useEffect(() => {
    axios.get<UserPlaysModel[]>(path).then(res => {
      const history: PlaysHistory[] = [{ scores: currentTop, date: Date.now() }];

      // start from the latest change
      for (const change of res.data.reverse()) {
        for (const play of change.added) {
          const index = history[0].scores.findIndex(score => scoreEquator(play, score));
          if (index !== -1) {
            history[0].scores[index].added = true
          }
        }

        // need to compare against the last scores, so we copy them into the local history
        const localHistory: PlaysHistory = { scores: JSON.parse(JSON.stringify(history[0].scores)), date: change.date };
        localHistory.scores = localHistory.scores.filter(score => !score.added)

        // add the removed plays 
        const removed = change.removed;
        if (removed) {
          for (const play of removed) {
            const index = localHistory.scores.findIndex(score => scoreEquator(play, score));
            if (index === -1) {
              localHistory.scores.push(play);
            }
          }
        }

        history[0].date = change.date
        history.unshift(localHistory); 
      }
      
      if (unique) {
        for (const date of history) {
          const idMap = new Set<string>()
          date.scores = date.scores.filter(item => {
            if (idMap.has(item.id)) {
              return false
            }
            idMap.add(item.id)
            return true
          })
        }
      }

      if (index === -1) {
        setIndex(history.length-1)
      }

      setPlaysHistory(history)
      setLoading(false)
    })
  }, [currentTop, path, unique, index])

  return !isLoading ? (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 self-center text-xl py-2">
        <ArrowBackIcon 
          onClick={() => setIndex(index-1)} 
          className={`${index===0 && 'invisible'} cursor-pointer hover:text-red-500 transition duration-200 ease-in`}
        />

        <TopPlaysDatePicker onClick={(i: number) => setIndex(i === -1 ? index : i)} selected={new Date(playsHistory[index].date)} dates={playsHistory.map(item => item.date)} />

        <ArrowForwardIcon 
          onClick={() => setIndex(index+1)} 
          className={`${index===(playsHistory.length-1) && 'invisible'} cursor-pointer hover:text-green-500 transition duration-200 ease-in`}
        />
      </div>

      <span className="w-full text-center text-xs italic">Note: At the time of a pp rework, many plays will be green</span>

      {country && 
        <button onClick={() => setUnique(!unique)} className="button button-green">
          {unique ? "Show All Plays" : "Hide Duplicate Maps"}
        </button>
      }

      <div className="flex flex-col gap-1 min-w-0">
        {playsHistory[index].scores.sort((a,b) => parseFloat(b.pp) - parseFloat(a.pp)).map((item, index) => (
          <div
            key={index} 
            className={`${item.added && 'dark:text-green-400 bg-green-400'} flex  justify-between dark:bg-dark03 border border-black rounded p-1 text-tiny md:text-base`}
          >
            <div className="flex items-center min-w-0">
              {country && (
                <div className="flex items-center mr-4 " >
                  <span className="w-5 md:w-8">{index+1}</span>
                  <a className="hover:underline w-12 md:w-24 truncate" href={"/redirect/" + item.player}>{item.player}</a>
                </div>
              )}
              <a target="_blank" rel="noreferrer" href={"https://osu.ppy.sh/beatmaps/" + item.id} className="min-w-0 flex flex-col hover:underline ">
                <div className="flex gap-1 items-center truncate">
                  <span>{songName(item.name)}</span>
                  <span className="md:text-sm">by {artist(item.name)}</span>
                </div>
                <div className="flex gap-2 items-center truncate">
                  <span>{diffName(item.name)}</span>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-1 md:gap-2 pl-2">
              <span>{item.mods.join(",")}</span>
              <span>{(item.acc*100).toFixed(2)}%</span>
              <span>{parseFloat(item.pp).toFixed(0)}pp</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null 
}

const diffName = (name: string) => name.match(/(\[(.*?)\])$/g)??"".slice(-1)[0];

const artist = (name: string) => name.split(" - ")[0]

const songName = (name: string) =>
  name
    .replace(/(\[(.*?)\])$/g, "")
    .replace(artist(name), "")
    .replace(/- /, "");
