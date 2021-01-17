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
                <UserTable 
                data={players}
                columns={[
                    {   title: 'Name', 
                        field: 'name', 
                        render: rowData => <a style={{color: '#3282b8'}} href={"http://osutracker.com/user/" + rowData.name}>{rowData.name}</a> 
                    },
                    {   title: 'Rank', 
                        field: 'rank', 
                        render: rowData => <h1>{rowData.rank}</h1>,
                        type: 'numeric',
                        defaultSort: 'asc'
                    },
                    {   title: 'pp', 
                        field: 'pp', 
                        render: rowData => <h1>{rowData.pp}</h1>,
                        type: 'numeric'
                    },
                ]}
                options={{
                    paging:true,
                    pageSize:10,
                    emptyRowsWhenPaging: true,
                    pageSizeOptions:[5, 10, 20]   
                }}
                />
            </div>
        </div>
    )
}
