import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import CountryDetails from '../molecules/CountryDetails'
import CountryGraphs from '../molecules/CountryGraphs'
import CountryPlayers from '../molecules/CountryPlayers'

export default function Country(props) {

    const [countryDetails, setCountryDetails] = useState([])
    const [countryStats, setCountryStats] = useState([])
    const [countryPlayers, setCountryPlayers] = useState([])
    const [countryPlays, setCountryPlays] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/countries/" + props.match.params.name + "/details").then((res) => {
          setCountryDetails(res.data[0])
          axios.get("/api/countries/" + props.match.params.name + "/stats").then((res) => {
            setCountryStats(res.data)
            axios.get("/api/countries/" + props.match.params.name + "/plays").then((res) => {
              setCountryPlays(res.data)
              axios.get("/api/countries/" + props.match.params.name + "/players").then((res) => {
                setCountryPlayers(res.data)
                setLoading(false)
              })
            })
          })
        })
      }, [props.match.params.name])

    return isLoading ? (
        <div className="w-screen h-screen flex justify-center align-center">
            <CircularProgress className="self-center" size="10rem" />
        </div>
    ) : (
        <div className="flex flex-col items-center">
            <CountryDetails details={countryDetails} />
            <div className="text-center">
                Country stats are based on the Top 100 plays made by the Top 50 players.
            </div>
            <CountryGraphs stats={countryStats} />
            <CountryPlayers players={countryPlayers} />
        </div>
    )
}
