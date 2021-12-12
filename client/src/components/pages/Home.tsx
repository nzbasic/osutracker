import { Search } from '../navigation/Search'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import CountryPlayersGraph from '../graphs/CountryPlayersGraph'
import { CountryPlayers } from "../../../../models/CountryPlayers.model";
import { CircularProgress } from '@material-ui/core';
import { ChangeLog } from '../misc/ChangeLog'
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

toast.configure()

export const Home = () => {
    const [isLoading, setLoading] = useState(true)
    const [playerData, setPlayerData] = useState<CountryPlayers[]>([])
    const [numberUsers, setNumberUsers] = useState(12773)
    const [numberCountries, setNumberCountries] = useState(150)
    const [nameInput, setNameInput] = useState("")
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        document.title = "osuTracker"
        axios.get<CountryPlayers[]>("/api/countries/Global/players").then(res => {
            setPlayerData(res.data.slice(-90))
            setLoading(false)
        })

        axios.get<number>("/api/users/number").then(res => {
            setNumberUsers(res.data)
        })

        axios.get<number>("/api/countries/number").then(res => {
            setNumberCountries(res.data)
        })
    }, [])

    const toastSetting: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "",
      };

    const add = async () => {
        setAdding(true)

        const res = await axios.post("/api/users/add", { name: nameInput }).catch((err: AxiosError) => {
            if (err.response!.status === 404) {
                toast.error("osu! Account not found!", toastSetting)
            } else if (err.response!.status === 409) { 
                toast.error("Already Exists!", toastSetting)
            }
        })

        if (res && res.status === 201) {
            toast.success(nameInput + " Added!", toastSetting)
        }
        
        setTimeout(() => {
            setAdding(false)
        }, 1000)
    }

    return (
        <div className="main-container flex flex-col">
            <Helmet>
                <meta property="og:title" content="osuTracker" />
                <meta
                    property="og:description"
                    content="osu! Statistics Tracker. Tracking performance, top plays and profile statistics for both regular users and overall countries. You can easily add yourself and all stats are updated daily."
                />
                <meta
                    property="og:image"
                    content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
                />
                <meta
                    name="twitter:image"
                    content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
                />
                <meta name="twitter:title" content="osuTracker" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:description"
                    content="osu! Statistics Tracker. Tracking performance, top plays and profile statistics for both regular users and overall countries. You can easily add yourself and all stats are updated daily."
                />
            </Helmet>
            <div className="py-4 lg:py-8 px-4 md:px-8 w-full flex flex-col md:flex-row">
                <div className="flex flex-col md:h-auto w-full lg:w-3/5 mr-12 items-center md:items-start mt-4 lg:mt-0">
                    <h1 className="text-2xl md:text-5xl lg:text-3xl font-medium">Welcome to osuTracker</h1>
                    <h2 className="text-base md:text-3xl lg:text-xl">A pathway to deep, granular, historic data.</h2>
                    <div className="mt-4 w-60 h-64 mb-8 lg:mb-4">
                        <Search alwaysFocused={true} />
                    </div>
                </div>
                <div className="border-2 border-gray-400 dark:border-black dark:bg-dark03 rounded h-60 md:h-auto w-full flex-col hidden lg:flex">
                    <div className="border-b-2 border-gray-400 dark:border-black h-10 flex items-center justify-center font-medium">
                        <span>90 Day Global Top 10 History</span>
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-center px-2">
                        {isLoading ? <CircularProgress /> : <CountryPlayersGraph players={playerData} /> }
                    </div>
                </div>
            </div>

            <div className="dark:bg-blue-500 bg-blue-400 py-4 lg:py-8 px-4 md:px-8 text-white flex justify-between">
                <div className="flex flex-col">
                    <h2 className="text-lg md:text-2xl font-medium">Get Started</h2>
                    <h3 className="text-sm md:text-xl">Start tracking yourself (or another person)</h3>
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-end">
                    <button 
                        disabled={adding || nameInput === ""} 
                        onClick={() => add()} 
                        className={`w-16 ${(adding || nameInput === "") ? 'dark:bg-gray-400 bg-gray-500 cursor-default' : 'bg-green-400 dark:bg-green-500 hover:bg-green-300 dark:hover:bg-green-400'} button transition ease-in text-white`}
                    >
                        {adding ? <CircularProgress  size={15} className="text-white" /> : <span>Add</span>}
                    </button>
                    <input 
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="osu! Username"
                        className="shadow-md rounded-md h-10 w-40 lg:w-60 border-gray-200 border-2 pl-2 text-gray-900 dark:text-white dark:bg-dark03 dark:border-transparent"/>
                </div>
            </div>

            <div className="py-4 lg:py-8 px-4 md:px-8 ">
                <h2 className="text-2xl font-medium">Unique data sets</h2>
                
                <div className="flex flex-col mt-4 border-l-4 border-blue-400 dark:border-blue-500 -ml-3 pl-2">
                    <h2 className="text-xl md:text-2xl">Countries</h2>
                    <h3 className="text-base md:text-lg">See a countries' overall performance, accuracy, top 100 plays and more.</h3>
                </div>
                
                <div className="flex flex-col mt-4 border-l-4 border-blue-400 dark:border-blue-500 -ml-3 pl-2">
                    <h2 className="text-xl md:text-2xl">Farm</h2>
                    <h3 className="text-base md:text-lg">See what percentage of your plays are from the most played mapsets.</h3>
                </div>

                <div className="flex flex-col mt-4 border-l-4 border-blue-400 dark:border-blue-500 -ml-3 pl-2">
                    <h2 className="text-xl md:text-2xl">Global Stats</h2>
                    <h3 className="text-base md:text-lg">See the top 10 player history, top plays history, overall performance and more using data from all top players.</h3>
                </div>

                <div className="flex flex-col mt-4 border-l-4 border-blue-400 dark:border-blue-500 -ml-3 pl-2">
                    <h2 className="text-xl md:text-2xl">Top Plays</h2>
                    <h3 className="text-base md:text-lg">See an in depth view of how your top plays have changed over time.</h3>
                </div>

                <div className="flex flex-col mt-4 border-l-4 border-blue-400 dark:border-blue-500 -ml-3 pl-2">
                    <h2 className="text-xl md:text-2xl">Historic Top 50 Players</h2>
                    <h3 className="text-base md:text-lg">Old screenshots and website archives have been searched through to construct a view of the top 50 throughout osu! history.</h3>
                </div>
            </div>

            <div className="dark:bg-blue-500 bg-blue-400 py-4 lg:py-8 px-4 md:px-8 text-white">
                <div className="flex flex-col">
                    <h2 className="text-lg md:text-2xl font-medium">Currently tracking {numberUsers} players and {numberCountries} countries.</h2>
                    <h2 className="text-lg md:text-2xl font-medium">Data updated daily, for free, forever.</h2>
                </div>
            </div>

            <div className="px-4 md:px-8 pt-4">
                <ChangeLog />
            </div>

            <div className="px-4 md:px-8 flex flex-col items-start py-4">
                <div className="flex flex-col mt-2">
                    <span className="text-lg font-medium">Check out Collection Helper!</span>
                    <span className="mt-2">Features:</span>
                    <span>- Create/Edit collections</span>
                    <span>- Inbuilt Stream/Farm filters</span>
                    <span>- Create custom filters using JavaScript</span>
                    <span>- Automatic practice diff generator</span>
                    <span>- Import/Export collections with beatmaps included</span>
                    <span>- Mass download maps (stream, farm, loved etc.)</span>
                    <a
                        href="https://github.com/nzbasic/Collection-Helper"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 mt-4"
                    >
                        Click here to check it out!
                    </a>
                </div>
            </div>
           

        </div>
    )
}