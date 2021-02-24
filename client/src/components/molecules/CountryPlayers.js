import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import stc from 'string-to-color'
import moment from "moment"
import '../../css/Chart.css'
import {
    ResponsiveContainer,
    CartesianGrid,
    Line,
    Label,
    Brush,
    Tooltip,
    LineChart,
    XAxis,
    YAxis,
  } from "recharts";

export default function CountryPlayers({ players }) {
  const [playerPoints, setPlayerPoints] = useState([])
  const [playerNames, setPlayerNames] = useState([])


  useEffect(() => {

    let dataPoints = []
    let playerList = []

    players.forEach(point => {
        point.listPlayers.forEach((player, index) => {
            dataPoints.push({
                date: point.date + index*1000,
                [player.name]: parseFloat(player.pp)
            })
            let flag = true
            playerList.forEach(name => {
                if (name.name == player.name) {
                    flag = false
                }
            })
            if (flag) playerList.push({name: player.name, colour: stc(player.name)})
        })
    })

    setPlayerNames(playerList)
    setPlayerPoints(dataPoints)

  }, [players])

  return (
    <div className="w-graph h-96 bg-main-one p-4">
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={playerPoints} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={["auto", "auto"]}
            name="Date"
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
            type="number"
          />
          <YAxis name="pp" domain={["dataMin", "dataMax"]}/>
          <Brush
            dataKey="date"
            height={30}
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
          />
          <Tooltip content={<CustomTooltip />} />
          {
            playerNames.map(player => {
                return (<Line key={player.name} dataKey={player.name} strokeWidth={2} stroke={player.colour} connectNulls={true} />)
            })
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="text-main-three">
          <p className="label">
            {moment(label).format("DD M YY") + " : " + payload[0].name + " " + payload[0].value + "pp"}
          </p>
        </div>
      );
    }
    return null;
};
