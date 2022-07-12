import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { HistoricTop } from '../../../../models/HistoricTop.model'
import Select from 'react-select'
import { ThemeContext } from "../../ThemeProvider"
import { Loading } from "./Loading"
import { getTheme } from "../../util/selectTheme"

// add notable events

interface YearOption {
  value: number
  label: string
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const Historic = () => {
  const [allHistoric, setAllHistoric] = useState<HistoricTop[]>([])
  const [selectedHistoric, setSelectedHistoric] = useState<HistoricTop>()
  const [isLoading, setLoading] = useState(true)
  const [visualization, setVisualization] = useState(false)
  const [years, setYears] = useState<YearOption[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(2012)
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [availableMonths, setAvailableMonths] = useState<Set<string>>(new Set())
  const theme = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Historic Top Players"
    axios.get<HistoricTop[]>("/api/stats/historicTop").then(res => {
      setAllHistoric(res.data)
      setLoading(false)

      const yearSet = new Set<number>()
      const yearOptions: YearOption[] = []
      res.data.forEach(h => yearSet.add(h.year))

      for (const year of yearSet) {
        yearOptions.push({ value: year, label: year.toString() })
      }

      setYears(yearOptions)
    })
  }, [])

  useEffect(() => {
    const monthSet = new Set<string>()
    const possible = allHistoric.filter(x => x.year === selectedYear)
    for (const item of possible) {
      monthSet.add(item.month)
    }

    setAvailableMonths(monthSet)

    for (const month of months) {
      if (monthSet.has(month)) {
        setSelectedMonth(month)
        break
      }
    }
  }, [selectedYear, allHistoric])

  useEffect(() => {
      setSelectedHistoric(allHistoric.find(x => x.year === selectedYear && x.month === selectedMonth))
  }, [selectedYear, selectedMonth, allHistoric])

  return !isLoading ? (
    <div className="main-container">   

      {visualization && (
        <div className="h-full w-full border-b-2 border-black">
          <iframe 
            scrolling="no" 
            title="Interactive or visual content" 
            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" 
            style={{width: "100%", height: "40vh", minHeight: "20rem"}} 
            src={`https://flo.uri.sh/visualisation/${theme?.mode === "light" ? '7645931' : '7646678'}/embed`}
          ></iframe>
        </div>
      )}

      <div className="px-4 md:px-8 pt-4 md:pt-8">
        <h1 className="text-5xl">Historic Top Players</h1>
        <h2 className="text-2xl max-w-2xl">Have a look through the history of osu!'s top players (by performance) from 2013-2020.</h2>
        <h3 className="max-w-2xl">*Note: The day of the month for each data point was not consistent.</h3>
        {visualization ? (
          <button className="button button-red text-white mt-2" onClick={() => setVisualization(false)}>Hide Visualization</button>
        ) : (
          <button className="button button-green text-white mt-2" onClick={() => setVisualization(true)}>View Visualization (May Lag)</button>
        )}
      </div>

      <div className="py-8 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <span className="force-w16">Year:</span>
          <div className="w-32">
            <Select 
              options={Array.from(years)} 
              isSearchable={false} 
              onChange={e => e && setSelectedYear(e.value)} 
              defaultValue={{ value: selectedYear, label: selectedYear.toString() }}
              theme={(selectTheme) => getTheme(theme, selectTheme)}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <span className="force-w16">Month:</span>
          <div className="flex flex-wrap gap-1">
            {months.map(item => (
              <button 
                key={item} 
                disabled={!availableMonths.has(item) || item === selectedMonth} 
                onClick={() => setSelectedMonth(item)} 
                className={`${item === selectedMonth && 'bg-green-400 dark:bg-green-400 text-white cursor-default'} ${availableMonths.has(item) ? 'dark:bg-gray-700 bg-white hover:bg-green-400 dark:hover:bg-green-400 transition duration-200 ease-in shadow-md cursor-pointer' : 'bg-gray-300 dark:bg-dark03 cursor-default'} px-2 py-1 rounded`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
 
      <div className="pb-4 px-4 md:px-8 flex flex-col md:inline-block items-center">
        <span className="text-4xl">Top 50</span>
        <table className="border border-black mt-4">
          <thead>
            <tr className="border border-black">
              <th className="border-r border-black w-16 px-2 py-1">Rank</th>
              <th className="border-r border-black w-44 px-2 py-1">Player</th>
              <th className="px-2 py-1 w-20">pp</th>
            </tr>
          </thead>
            {(selectedHistoric?.top??[]).map((item, index) => (
              <tbody key={index} className="odd:bg-gray-200 dark:odd:bg-dark03">
                <tr className="border-b border-black">
                  <td className="border-r border-black">#{index+1}</td>
                  <td className="border-r border-black">
                    <span>{item.name}</span>
                  </td>
                  <td>
                    <span>{item.pp}</span>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  ) : <Loading />
}