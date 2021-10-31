import { useEffect, useState } from "react"
import { UserDetails } from "../user/UserDetails"
import { UserGraphs } from "../user/UserGraphs"
import { User as UserDetailsModel } from '../../../../models/User.model'
import axios from "axios"
import { Loading } from "./Loading"
import { TopPlays } from "../misc/TopPlays"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet";

export const User = () => {
    const [details, setDetails] = useState<UserDetailsModel>()
    const [isLoading, setLoading] = useState(true)
    const params = useParams<"id">()
    const id = params.id??"9008211"
    
    useEffect(() => {
        axios.get<UserDetailsModel>("/api/users/" + id).then(res => {
            document.title = res.data.name + "'s Profile"
            setDetails(res.data)
            setLoading(false)
        })
    }, [id])

    return !isLoading ? (
        <div className="main-container">
            <Helmet>
                <meta property="og:title" content={`${details?.name}'s osu! history`} />
                <meta
                    property="og:description"
                    content={`See ${details?.name}'s past top plays, performance, rank and more.`}
                />
                <meta
                    property="og:image"
                    content={"https://a.ppy.sh/" + id}
                />
                <meta
                    name="twitter:image"
                    content={"https://a.ppy.sh/" + id}
                />
                <meta
                    name="twitter:title"
                    content={`${details?.name}'s osu! history`}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:description"
                    content={`See ${details?.name}'s past top plays, performance, rank and more.`}
                />
            </Helmet>
            <div className="p-4">
                {details && <UserDetails details={details} /> }
            </div>
            <div className="w-full h-72 md:h-96">
                <UserGraphs id={id} /> 
            </div>
            {details && details.currentTop.length ? (
                <div className="px-4 py-2 mb-2">
                    {details && <TopPlays currentTop={details.currentTop} path={`/api/users/${id}/plays`} /> }
                </div>
            ) : <div className="w-full flex text-center">
                    <span className="w-full text-center text-lg py-4">Come back later to see your top score history.</span>
                </div>}
        </div>
    ) : ( <Loading /> )
}