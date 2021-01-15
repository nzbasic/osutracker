import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../molecules/Header'
import UserTable from '../molecules/UserTable'

export default function AllUser() {
    const [players, setPlayers] = useState([]);

    function createData(user) {
        return { user };
      }

    useEffect(() => {
        axios.get("/players").then((response) => {
            let data = response.data
            console.log(data[0])
            let out = []
            for (let i = 0 ; i < data.length ; i++) {
                out.push({
                    name: data[i].name,
                    rank: data[i].rank,
                    pp: data[i].pp
                })
            }
            setPlayers(out)
        });
    },[]);

    return (
        <div className="h-screen bg-main-two">
            <Header />
            <div className="py-2 flex flex-col px-2 bg-main-two">
                <UserTable data={players}/>
            </div>
        </div>
    )
}
