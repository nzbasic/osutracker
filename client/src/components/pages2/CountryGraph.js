import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TimeSeriesChart from '../molecules/TimeSeriesChart'
import Loader from 'react-loader-spinner'
import Header from '../molecules/Header2'
import Country from '../molecules/Country'
import "../../css/Graph.css";
import { Column, Table } from 'react-virtualized'
import 'react-virtualized/styles.css';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';


export default function CountryGraph(props) {
    const [ppHistory, setPpHistory] = useState([])
    const [topScores, setTopScores] = useState([
        {player: "empty", name: "empty", pp: "empty", missCount: "empty", mods: "empty"}
    ])
    const [isLoading, setLoading] = useState(true)
    const [abbreviation, setAbbreviation] = useState("")
    

    useEffect(() => {

        axios.get("/country/abbreviation/" + props.match.params.country).then(response => {
            //console.log(response)
            setAbbreviation(response.data[0].abbreviation)
        })

        axios.get("/country/scores/" + props.match.params.country + "/latest").then(response => {
            setTopScores(response.data)
            //console.log(response.data)
        })

        axios.get("/country/ppHistory/" + props.match.params.country).then(response => {
            let pp = []

            for (let i = 0; i < response.data[0].ppHistory.length; i++) {
                pp.push({
                    x: response.data[0].ppHistory[i].date,
                    y: response.data[0].ppHistory[i].total,
                })
            }

            pp.sort((a, b) => a.x - b.x)
            setPpHistory(pp)
            setLoading(false)
        })
    }, [props.match.params.country])

    return isLoading ? (
        <div className="h-screen bg-main-two">
            <div className="load">
                <Loader id="spinner" type="ThreeDots" />
            </div>
        </div>
    ) : (
        !topScores ? <div></div> :
        <div className="flex flex-col h-screen bg-main-one">
            <Header />
            <Country
                name={props.match.params.country}
                abbreviation={abbreviation}
            />
            <div id="parent" className="flex lg:flex-row flex-col h-full">
                <div className="bg-main-four h-full w-full lg:w-1/2">
                    <AutoSizer>
                        {({height, width}) => (
                            <Table
                                width={width}
                                height={height}
                                headerHeight={30}
                                rowHeight={30}
                                rowCount={100}
                                rowGetter={({index}) => {
                                    if (topScores) {
                                        return topScores[index]
                                    } else {
                                        return {player: "empty", name: "empty", pp: "empty", missCount: "empty", mods: "empty"}
                                    }
                                }}
                            >
                                <Column label="#" dataKey="player" width={40} 
                                    cellRenderer={({rowIndex})=>(
                                        <div className="text-xs">
                                            {rowIndex+1}
                                        </div>
                                    )}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            #
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />
                                <Column label="Player" dataKey="player" width={100}
                                    cellRenderer={({cellData})=>(
                                        <div className="text-xs">
                                            {cellData}
                                        </div>
                                    )}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            Player
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />
                                <Column label="Map" dataKey="name" width={450}
                                    cellRenderer={({rowIndex, cellData}) => {
                                        if (topScores[rowIndex] === undefined) {
                                            return <div></div>
                                        } else {
                                            return (
                                                <a href={"https://osu.ppy.sh/beatmaps/"+topScores[rowIndex].id+"?mode=osu"}
                                                target="_blank"
                                                className="text-main-three text-xs"
                                                >
                                                    {cellData}
                                                </a>
                                            )
                                        }
                                    }}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            Map
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />
                                <Column label="Mods" dataKey="mods" width={90} 
                                    cellRenderer={({cellData})=>(
                                        <div className="text-xs">
                                            {cellData}
                                        </div>
                                    )}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            Mods
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />

                                <Column label="x" dataKey="missCount" width={25}
                                    cellRenderer={({cellData})=>(
                                        <div className="text-xs lg:text-sm">
                                            {cellData}
                                        </div>
                                    )}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            x
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />
                                <Column label="pp" dataKey="pp" width={60}
                                    cellRenderer={({cellData})=>(
                                        <div className="text-xs">
                                            {Math.floor(cellData)}
                                        </div>
                                    )}
                                    headerRenderer={()=>(
                                        <div className="text-xs">
                                            pp
                                        </div>
                                    )}
                                    cellDataGetter={({dataKey, rowData}) => {
                                        if (rowData === undefined) {
                                            return 0
                                        } else {
                                            return rowData[dataKey]
                                        }
                                    }}
                                />
                            </Table>
                        )}
                    </AutoSizer>
                        
                </div>
                <div className="bg-main-four h-full w-full lg:w-1/2 flex flex-col">
                    <h1 className="self-center">pp History Chart</h1>
                    <TimeSeriesChart chartData={ppHistory} />
                </div>
            </div>
            
        </div>
    )
}
