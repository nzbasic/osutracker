import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { User } from "../../../../models/User.model"

export const UserDetails = ({ details }: { details: User }) => {
  const [countryFull, setCountryFull] = useState("New Zealand")

  useEffect(() => {
    axios.get<string>("/api/countries/" + details.country).then(res => {
      setCountryFull(res.data)
    })
  }, [details])

  return (
    <div className="flex items-center w-full">
      <img src={"https://a.ppy.sh/" + details.id} alt="player" className="w-32 md:w-64 border border-black" />
      <div className="flex flex-col ml-2 md:ml-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <a href={"https://osu.ppy.sh/users/" + details.id} target="_blank" rel="noreferrer" className="text-base md:text-3xl font-medium hover:underline truncate mr-6">{details.name}</a>
          <Link
            className="outline-inner self-center w-5 md:w-auto -ml-6"
            to={"/country/" + countryFull}
          >
            <img
              alt="flag"
              src={
                "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                details.country +
                ".svg"
              }
              height={12}
              width={28}
            />
          </Link>
        </div>
          
        <span>{parseFloat(details.pp).toFixed(0)}pp</span>
        <span className="hidden md:block">Rank #{details.rank}</span>
        <span>Acc {parseFloat(details.acc).toFixed(2)}%</span>
        <span className="hidden md:block">Level {details.level.toFixed(1)}</span>
        <span>Range {parseFloat(details.range).toFixed(0)}pp</span>
        <span>Farm {details.farm}%</span>
        <span className="hidden md:block">{details.plays} Plays</span>
        <span className="hidden md:block">Joined {new Date(details.joined).toLocaleDateString()}</span>
      </div>
    </div>
  )
}