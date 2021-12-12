import { useEffect, useState } from "react"
import { UserDetails } from "../user/UserDetails"
import { UserGraphs } from "../user/UserGraphs"
import { User as UserDetailsModel } from '../../../../models/User.model'
import axios from "axios"
import { Loading } from "./Loading"
import { TopPlays } from "../misc/TopPlays"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet";
import { TimeScatterGraph } from "../graphs/TimeScatterGraph"
import TimezoneSelect from "react-timezone-select"

export const User = () => {
    const [details, setDetails] = useState<UserDetailsModel>()
    const [isLoading, setLoading] = useState(true)
    const params = useParams<"id">()
    const id = params.id??"9008211"
    const [offset, setOffset] = useState(new Date().getTimezoneOffset() / 60 * -1)
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    
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
            <div className="w-full h-72 md:h-96 px-4 pt-4">
                <div className="flex flex-col h-full border border-black rounded dark:bg-dark03">
                    <div className="border-b py-2 border-black flex items-center gap-2 justify-center font-medium z-20">
                        <span className="text-xs sm:text-base md:text-base">Top Play Time Scatter</span>
                        <div className="w-32 sm:md-52 md:w-72">
                            <TimezoneSelect
                                value={timezone}
                                onChange={(tz) => {
                                    if (tz.offset) {
                                        setOffset(tz.offset)
                                    }
                                    setTimezone(tz.value)
                                }}
                            />
                        </div>  
                    </div>
                    <div className="w-full h-full pb-1 flex flex-col items-center justify-center px-2 z-10">
                        <TimeScatterGraph chartData={details?.timesList??[]} tz={offset} />
                    </div>
                </div>
                
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