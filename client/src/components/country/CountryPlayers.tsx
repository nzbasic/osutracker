import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react"
import { CountryPlayers as CountryPlayersModel } from "../../../../models/CountryPlayers.model";
import CountryPlayersGraph from "../graphs/CountryPlayersGraph";

export const CountryPlayers = ({ name }: { name: string }) => { 
    const [data, setData] = useState<CountryPlayersModel[]>([])

    useEffect(() => { 
        axios.get<CountryPlayersModel[]>(`/api/countries/${name}/players`).then(res => {
            setData(res.data)
        })
    }, [name])

    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-full border border-black rounded dark:bg-dark03">
                <div className="border-b py-2 border-black flex items-center justify-center font-medium z-20">
                    Top 10 Players
                </div>
                <div className="w-full h-full pb-1 flex flex-col items-center justify-center px-2 z-10">
                    {!data.length ? <CircularProgress /> : <CountryPlayersGraph players={data} /> }
                </div>
            </div>
        </div>
    )
}