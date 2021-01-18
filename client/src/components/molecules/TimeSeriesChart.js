import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Label,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

const CustomTooltip = ({ active, payload, label}) => {
    if (active) {
        return (
            <div className="">
                <p className="label">{moment(label).format("DDD M YY") + " : " + Math.floor(payload[0].value) + "pp"}</p>
            </div>
        )
    }
    return null
}

const TimeSeriesChart = (props) => (
  <ResponsiveContainer width='95%' height='95%' >
    <LineChart data={props.chartData} margin={{top:25}}>
      <Label value="pp History Graph" offset={0} position="top" />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey='x'
        domain={['auto', 'auto']}
        name='Date'
        tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
        type='number'
      />
      <YAxis dataKey='y' name='pp' domain={['dataMin', 'auto']} />
      <Tooltip content={<CustomTooltip />}/>
      <Line
        strokeWidth={2}
        dataKey="y"
        type="monotone"
        stroke="#c91a34"
      />
    </LineChart>
  </ResponsiveContainer>
)

TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired
}

export default TimeSeriesChart