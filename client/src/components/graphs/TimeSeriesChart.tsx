import { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  CartesianGrid,
  Line,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  ReferenceArea
} from "recharts";
import { CustomResponsiveContainer } from "./CustomResponsiveContainer";
import { GraphData, truncate } from "./util";
import { ThemeContext } from "../../ThemeProvider";

export const TimeSeriesChart = ({ chartData, reversed }: { chartData: GraphData[], reversed: boolean }) => {
    const [refAreaLeft, setRefAreaLeft] = useState<string | number>("");
    const [refAreaRight, setRefAreaRight] = useState<string | number>("");
    const [bottom, setBottom] = useState<string | number>("dataMin-1")
    const [top, setTop] = useState<string | number>("dataMax+1")
    const [left, setLeft] = useState<string | number>("dataMin")
    const [right, setRight] = useState<string | number>("dataMax")

    useEffect(() => {
        zoomOut()
    }, [chartData])

    const getAxisYDomain = (
        from: number,
        to: number,
        offset: number
      ) => {
        const first = chartData.findIndex(item => item.x === from)
        const second = chartData.findIndex(item => item.x === to)
        const refData: GraphData[] = chartData.slice(first - 1, second);
        let [bottom, top] = [refData[0].y, refData[0].y];
   
        refData.forEach((d) => {
          if (d.y > top) top = d.y;
          if (d.y < bottom) bottom = d.y;
        });
      
        return [bottom - offset, top + offset];
      };

      const zoom = () => {
        if (refAreaLeft === refAreaRight || refAreaRight === "") {
            setRefAreaLeft("");
            setRefAreaRight("");
          return;
        }
    
        let bottom, top: number
        if (refAreaLeft > refAreaRight) {
            [bottom, top] = getAxisYDomain(refAreaRight as number, refAreaLeft as number, 1);
        } else {
            [bottom, top] = getAxisYDomain(refAreaLeft as number, refAreaRight as number, 1);
        }

        setBottom(bottom)
        setTop(top)
        setLeft(refAreaLeft)
        setRight(refAreaRight)
        setRefAreaLeft("");
        setRefAreaRight("");
      }

      const zoomOut = () => {
        setRefAreaLeft("");
        setRefAreaRight("");
        setBottom("dataMin");
        setTop("dataMax+1");
        setLeft("dataMin")
        setRight("dataMax")
      }

    const theme = useContext(ThemeContext);
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active) {
          return (
            <div className="text-main-three bg-main-one p-2 rounded-md">
              <p className="label">
                {payload && moment(label).format("DD M YY") + " : " + truncate(payload[0].value)}
              </p>
            </div>
          );
        }
        return null;
      };

  return (
    <div className="w-full h-full flex flex-col items-center -ml-2 dark:text-white overflow-y-hidden">
        <span className="text-xs mt-1 -mb-4 hover:underline cursor-pointer z-10" onClick={() => zoomOut()}>Drag to zoom, click here to zoom out</span>
        <CustomResponsiveContainer>
            <LineChart 
                data={chartData} 
                margin={{ top: 25 }} 
                onMouseDown={(e: any) => e && setRefAreaLeft(e.activeLabel)} 
                onMouseMove={(e: any) => e && refAreaLeft && setRefAreaRight(e.activeLabel)} 
                onMouseUp={zoom.bind(this)}>
            
            <CartesianGrid strokeDasharray="3 3" stroke={theme?.mode === "light" ? "black" : "white"} />
            <XAxis
                stroke={theme?.mode === "light" ? "black" : "white"}
                dataKey="x"
                allowDataOverflow
                domain={[left, right]}
                name="Date"
                tickFormatter={(unixTime) => moment(unixTime).format("MMM Do YY")}
                type="number"
            />
            <YAxis
                allowDataOverflow
                stroke={theme?.mode === "light" ? "black" : "white"}
                reversed={reversed}
                dataKey="y"
                name="pp"
                domain={[bottom, top]}
                tickFormatter={truncate}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
                strokeWidth={3}
                dataKey="y"
                type="monotone"
                stroke="#c91a34"
                dot={false}
            />
            {refAreaLeft && refAreaRight ? (
                <ReferenceArea
                    stroke="black"
                    x1={refAreaLeft}
                    x2={refAreaRight}
                    strokeOpacity={0.3}
                />
            ) : null}
            </LineChart>
        </CustomResponsiveContainer>
    </div>
  );
};
