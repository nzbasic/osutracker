import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Country as CountryDetailsModel } from '../../../../models/Country.model'
import { CountryContributors } from '../country/CountryContributors'
import { CountryDetails } from '../country/CountryDetails'
import { CountryGraphs } from '../country/CountryGraphs'
import { CountryPlayers } from '../country/CountryPlayers'
import { SimpleSummaryAccordion } from '../misc/SimpleSummaryAccordion'
import { TopPlays } from '../misc/TopPlays'
import { Loading } from './Loading'
import { Helmet } from "react-helmet";

export const Country = () => {
  const [country, setCountry] = useState<CountryDetailsModel>()
  const params = useParams<"name">()
  const name = params.name??"Global"

  useEffect(() => {
    document.title = name + "'s Profile"
    axios.get<CountryDetailsModel>(`/api/countries/${name}/details`).then(res => {
        setCountry(res.data)
    })
  }, [name])

  return country !== undefined ? (
    <div className="main-container flex flex-col p-4">
      <Helmet>
        <meta
          property="og:title"
          content={`${country.name}'s osu! history`}
        />
        <meta
          property="og:description"
          content={`See ${country.name}'s past top plays, top players, performance and more.`}
        />
        <meta
          property="og:image"
          content={
            "https://flagpictures.imgix.net/" +
            country.abbreviation.toLowerCase() +
            ".png"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://flagpictures.imgix.net/" +
            country.abbreviation.toLowerCase() +
            ".png"
          }
        />
        <meta
          name="twitter:title"
          content={`${country.name}'s osu! history`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={`See ${country.name}'s past top plays, top players, performance and more.`}
        />
      </Helmet>
      <CountryDetails details={country} />
      {name !== "Global" && 
        <Link to={"/all?country=" + name} className="button button-green mt-4 flex justify-center items-center">View Player List</Link>
      }
      <div className="w-full h-72 md:h-96 mt-4">
        <CountryGraphs name={name} />
      </div>
      <div className="h-72 md:h-96 my-4">
        <CountryPlayers name={name} />
      </div>
      <SimpleSummaryAccordion title="pp Contributors" >
        <CountryContributors contributors={country.contributors} />
      </SimpleSummaryAccordion>
      <div className="mt-1">
        <TopPlays country path={`/api/countries/${name}/plays`} currentTop={country.scoresCurrent} />
      </div>
    </div>
  ) : <Loading />
}