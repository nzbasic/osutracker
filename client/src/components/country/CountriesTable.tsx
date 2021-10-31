import axios from "axios";
import { useEffect, useState } from "react";
import { Country } from "../../../../models/Country.model";

interface Header {
    name: string
    value: string
    mobile?: boolean
}

const headers: Header[] = [
    { name: "Rank", value: "rank", mobile: true },
    { name: "Name", value: "name", mobile: true },
    { name: "pp (Plays)", value: "pp", mobile: true },
    { name: "pp (Players)", value: "playerWeighting", mobile: true },
    { name: "Acc", value: "acc", mobile: true },
    { name: "Farm", value: "farm" },
    { name: "Range", value: "range" },
    { name: "Objects/Play", value: "averageObjects" }
]

export const CountriesTable = () => {
    const [data, setData] = useState<Country[]>([]);
    const [sorting, setSorting] = useState("pp")
    const [order, setOrder] = useState("desc")

    useEffect(() => {
        document.title = "All Countries"
        axios
            .get<Country[]>("/api/countries/limitedAll")
            .then((data) => {
                const countries = data.data.sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp))
                countries.forEach((country, index) => {
                    country.rank = index
                })
                setData(countries)
            });
    }, [])

    useEffect(() => {
        if (order === "asc") {
            setData(data.sort((a: any, b: any) => parseFloat(a[sorting]) - parseFloat(b[sorting])))
        } else {
            setData(data.sort((a: any, b: any) => parseFloat(b[sorting]) - parseFloat(a[sorting])))
        }
    }, [sorting, order, data])

    const parseSorting = (value: string) => {
        if (value === sorting) {
            if (order === "desc") {
                setOrder("asc")
            } else {
                setOrder("desc")
            }
        } else {
            setSorting(value)
        }
    }

    return (
        <div className="flex flex-col text-xs lg:text-base">
            <table>
                <thead className="border-b border-black">
                    <tr>
                        {headers.map((header) => (
                            <th onClick={() => parseSorting(header.value)} className={`${!header.mobile && 'hidden md:table-cell'} hover:underline cursor-pointer`} key={header.name}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
                {data.map((d, index) => (
                    <tbody key={index} className="odd:bg-gray-200 dark:odd:bg-dark03">
                        <tr className="centered">
                            <td>{d?.rank??0}</td>
                            <td className="truncate">{d.name}</td>
                            <td>{parseFloat(d.pp).toFixed(0)}</td>
                            <td>{(d?.playerWeighting??0).toFixed(0)}</td>
                            <td>{(d.acc*100).toFixed(2)}%</td>
                            <td className="hidden md:table-cell">{d.farm}%</td>
                            <td className="hidden md:table-cell">{parseFloat(d.range).toFixed(0)}</td>
                            <td className="hidden md:table-cell">{d.averageObjects.toFixed(0)}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
        
    )
}