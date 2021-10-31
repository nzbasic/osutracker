import axios from "axios"
import { useEffect, useState } from "react"
import { OverallStats } from '../../../../models/OverallStats.model'
import { Loading } from "./Loading"
import { SimpleSummaryAccordion } from "../misc/SimpleSummaryAccordion"
import { TopMapsets } from "../stats/TopMapsets"
import { TopPlay } from "../stats/TopPlay"
import { Helmet } from "react-helmet";
import { PPBarriers } from "../stats/PPBarriers"

export const Stats = () => {
    const [stats, setStats] = useState<OverallStats | undefined>()

    useEffect(() => {
        document.title = "Stats"
        axios.get<OverallStats>("/api/stats/").then(res => {
            setStats(res.data)
        })
    }, [])

    return stats ? (
        <div className="main-container">
            <Helmet>
                <meta property="og:title" content="osuTracker Overall Stats" />
                <meta
                    property="og:description"
                    content="See the most common top play, most played map sets, most common mods used, average country performance and more."
                />
                <meta
                    property="og:image"
                    content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
                />
                <meta
                    name="twitter:image"
                    content="https://cdn.discordapp.com/attachments/627267590862929961/901425993485545514/unknown.png"
                />
                <meta name="twitter:title" content="osuTracker Overall Stats" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:description"
                    content="See the most common top play, most played map sets, most common mods used, average country performance and more."
                />
            </Helmet>
            <div className="pt-8 flex flex-col gap-2 px-8">
                <span className="text-3xl">Average Overall Stats</span>
                <SimpleSummaryAccordion expanded title="Average Tracked User">
                    <div className="flex flex-col gap-2 dark:text-white">
                        <span>Acc: {stats.userStats.acc.toFixed(2)}%</span>
                        <span>Farm: {stats.userStats.farm.toFixed(0)}%</span>
                        <span>Play Length: {stats.userStats.lengthPlay.toFixed(0)}s</span>
                        <span>Objects/Play: {stats.userStats.objectsPlay.toFixed(0)}</span>
                        <span>pp: {stats.userStats.pp.toFixed(0)}</span>
                        <span>Range: {stats.userStats.range.toFixed(0)}</span>
                        <span>Playcount: {stats.userStats.plays.toFixed(0)}</span>
                        <span>Joined Date: {new Date(stats.userStats.timeJoined).toLocaleDateString()}</span>
                    </div>
                </SimpleSummaryAccordion>

                <SimpleSummaryAccordion expanded title="Average Tracked Country">
                    <div className="flex flex-col gap-2 dark:text-white">
                        <span>Acc: {(stats.countryStats.acc*100).toFixed(2)}%</span>
                        <span>Farm: {stats.countryStats.farm.toFixed(0)}%</span>
                        <span>Play Length: {stats.countryStats.lengthPlay.toFixed(0)}s</span>
                        <span>Objects/Play: {stats.countryStats.objectsPlay.toFixed(0)}</span>
                        <span>pp: {stats.countryStats.pp.toFixed(0)}</span>
                        <span>Range: {stats.countryStats.range.toFixed(0)}</span>
                    </div>
                </SimpleSummaryAccordion>
            </div>

            <div className="pt-8 px-8">
                <span className="text-3xl">Most Common Top Play</span>
                <TopPlay id={stats.userStats.topPlay} />
            </div>

            <div className="pt-8 px-8">
                <span className="text-3xl">Most Common x pp Plays</span>
                <PPBarriers />
            </div>

            <div className="pt-8 px-8 flex flex-col gap-2">
                <span className="text-3xl">Top Mod Combinations (by count)</span>
                <SimpleSummaryAccordion title="Mods">
                    <div className="flex flex-col gap-1 dark:text-white">
                        {stats.userStats.modsCount.slice(0,100).map((mod, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="w-8">{index+1}</span>
                                <span>{mod.mods.length ? mod.mods.join(",") : "None"}</span>
                                <span>{mod.count}</span>
                            </div>
                        ))}
                    </div>
                </SimpleSummaryAccordion>
            </div>

            <div className="pt-8 px-8 flex flex-col gap-2">
                <span className="text-3xl">Top 100 Mappers (by count)</span>
                <SimpleSummaryAccordion title="Mappers">
                    <div className="flex flex-col gap-1 dark:text-white">
                        {stats.mapperCount.slice(0,100).map((mapper, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="w-8">{index+1}</span>
                                <span>{mapper.mapper}</span>
                                <span>{mapper.count}</span>
                            </div>
                        ))}
                    </div>
                </SimpleSummaryAccordion>
            </div>

            <div className="py-8 px-8 flex flex-col gap-2">
                <span className="text-3xl">Top 727 Beatmap Sets (by count)</span>
                <SimpleSummaryAccordion title="Beatmap Sets">
                    <TopMapsets sets={stats.setCount.slice(0, 727)}/>
                </SimpleSummaryAccordion>
            </div>
            
        </div>
    ) : <Loading />
}