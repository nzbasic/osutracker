import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts"
import { ThemeContext } from "../../ThemeProvider";
import { CustomResponsiveContainer } from "./CustomResponsiveContainer"

export const TimeScatterGraph = ({ chartData, tz }: { chartData: { date: string, pp: string }[], tz: number }) => {
    const [data, setData] = useState<any[]>([])
    const theme = useContext(ThemeContext);
    
    // need to convert dates to a time format for the graph, eg 0000 as midnight and 2359 as 11:59pm
    useEffect(() => {
        setData(chartData.map(item => { 
            const date = new Date(item.date)
            let hours = ((date.getHours() + tz) % 24) * 100

            // if hours has gone negative, wrap it around, eg -5 hours -> 19 hours
            if (hours < 0) {
                hours += 2400
            }

            const minutes = date.getMinutes()   
            return { x: hours + minutes, y: parseInt(item.pp) }
        }))
    }, [chartData, tz])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active) {
          return (
            <div className="bg-white dark:bg-dark01 border border-black rounded flex flex-col p-2">
                <span>Time: {payload && formatTickTime(payload[0].value)}</span>
                <span>{payload && payload[1].value}pp</span>
            </div>
          );
        }
        return null;
      };

    const formatTickTime = (time: number) => {
        // 0 => 12:00am
        // 330 => 3:30am
        // 1230 => 12:30pm
        // 2359 => 11:59pm
        const hours = Math.floor(time / 100)
        const minutes = time % 100
        let minute = "0"

        if (minutes === 0) {
            minute = "00"
        } else if (minutes < 10) {
            minute = `0${minutes}`
        } else {
            minute = minutes.toString()
        }

        const ampm = hours >= 12 ? 'pm' : 'am'
        const hour = hours % 12
        return `${hour === 0 ? 12 : hour}:${minute}${ampm}`
    }

    return (
        <div className="w-full h-full flex flex-col items-center -ml-2 dark:text-white overflow-y-hidden">
            <CustomResponsiveContainer>
                <ScatterChart 
                    data={data}
                    margin={{ left: -20, top: 10 }} 
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme?.mode === "light" ? "black" : "white"} />
                    <XAxis
                        stroke={theme?.mode === "light" ? "black" : "white"}
                        dataKey="x"
                        allowDataOverflow
                        name="Time"
                        domain={[0, 2400]}
                        tickFormatter={(time: number) => formatTickTime(time)}
                        type="number"
                    />
                    <YAxis
                        allowDataOverflow
                        stroke={theme?.mode === "light" ? "black" : "white"}
                        domain={["dataMin", "dataMax"]}
                        dataKey="y"
                        name="pp"
                    />
                    <Tooltip content={<CustomTooltip />}/>
                    <Scatter data={data} stroke={theme?.mode === "light" ? "black" : "white"} />
                </ScatterChart>
            </CustomResponsiveContainer>
        </div>
    )
}