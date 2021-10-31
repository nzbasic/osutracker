import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../../../models/User.model";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

interface FilterUserRes {
    data: User[]
    numberResults: number
}

interface Header {
    name: string
    value: string
    mobile?: boolean
}

const headers: Header[] = [
    { name: "Rank", value: "rank", mobile: true },
    { name: "Name", value: "name", mobile: true },
    { name: "pp", value: "pp", mobile: true },
    { name: "Acc", value: "acc", mobile: true },
    { name: "Farm", value: "farm", mobile: true },
    { name: "Range", value: "range", mobile: true },
    { name: "Level", value: "level" },
    { name: "Joined", value: "joined" },
    { name: "Objects/Play", value: "averageObjects" }
]

export const UsersTable = ({ country }: { country?: string }) => {
    const [data, setData] = useState<User[]>([]);
    const [numberResults, setNumberResults] = useState(0);
    const [page, setPage] = useState(1);
    const [sorting, setSorting] = useState("pp")
    const [order, setOrder] = useState("desc")
    const pageSize = 50

    useEffect(() => {
        document.title = "All Users"
        const link = "/api/" + (country ? "countries/" : "users/") + "allFilter" + (country ? "/" + country : "")
        console.log(link)

        axios
            .get<FilterUserRes>(link, { params: { name: sorting, order: order, page: page },})
            .then((res) => {
                console.log(res)
                setData(res.data.data.filter(item => item.rank !== "0" && item.farm !== -1));
                setNumberResults(res.data.numberResults);
            });
    }, [page, order, sorting, country])

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
        <div className="flex flex-col text-xs md:text-base">
            <table>
                <thead className="border-b border-black">
                    <tr className="">
                        {headers.map((header) => (
                            <th onClick={() => parseSorting(header.value)} className={`${!header.mobile && 'hidden md:table-cell'} hover:underline cursor-pointer`} key={header.name}>{header.name}</th>
                        ))}
                    </tr>
                </thead>
                    {data?.map((d, index) => (
                        <tbody key={index} className="odd:bg-gray-200 dark:odd:bg-dark03">
                            <tr className="centered">
                                <td>{d.rank}</td>
                                <td><a className="hover:underline" href={"/user/" + d.id}>{d.name}</a></td>
                                <td>{d.pp}</td>
                                <td>{d.acc}%</td>
                                <td>{d.farm}%</td>
                                <td>{parseFloat(d.range).toFixed(0)}</td>
                                <td className="hidden md:table-cell">{d.level}</td>
                                <td className="hidden md:table-cell">{new Date(d.joined).toLocaleDateString()}</td>
                                <td className="hidden md:table-cell">{d.averageObjects.toFixed(0)}</td>
                            </tr>
                        </tbody>
                    ))}
            </table>
            <div className="py-4 flex w-full justify-center items-center gap-1 border-t border-black">
                <ArrowBackIcon 
                    onClick={() => setPage(page-1)} 
                    className={`${page===1 && 'invisible'} cursor-pointer hover:text-red-500 transition duration-200 ease-in`}
                />
                <span className="text-xl w-36 text-center">{((page-1)*pageSize) + 1} - {page*pageSize}</span>
                <ArrowForwardIcon 
                    onClick={() => setPage(page+1)} 
                    className={`${(page*pageSize) > numberResults && 'invisible'} cursor-pointer hover:text-green-500 transition duration-200 ease-in`}
                />
            </div>
        </div>
        
    )
}