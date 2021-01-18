import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../molecules/Header";
import UserTable from "../molecules/UserTable";
import { Column, Table } from 'react-virtualized'
import Image from '../atoms/Image'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

export default function AllCountry() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/players").then((response) => {
      let data = response.data;
      let out = [];
      for (let i = 0; i < data.length; i++) {
        out.push({
          name: data[i].name,
          pp: data[i].pp,
          rank: data[i].rank
        });
      }
      out.sort((a,b) => parseInt(a.pp) < parseInt(b.pp))
      setPlayers(out);
    });
  }, []);

  return (
    <div className="h-screen bg-main-two flex flex-col">
      <Header />
      <div className="py-2 flex flex-col px-2 bg-main-four h-full">
        <AutoSizer className="">
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={30}
              rowHeight={30}
              rowCount={players.length}
              rowGetter={({ index }) => {
                if (players) {
                  return players[index];
                } else {
                  return {
                    name: "empty",
                    pp: "empty",
                    abbreviation: "empty"
                  };
                }
              }}
            >
              <Column
                label="Rank"
                dataKey="rank"
                width={60}
                cellRenderer={({ cellData }) => (
                  <div className="text-lg">{cellData}</div>
                )}
                headerRenderer={() => <div className="text-lg">Rank</div>}
                cellDataGetter={({ dataKey, rowData }) => {
                  if (rowData === undefined) {
                    return 0;
                  } else {
                    return rowData[dataKey];
                  }
                }}
              />
              <Column
                label="Player"
                dataKey="name"
                width={200}
                cellRenderer={({ cellData, rowIndex }) => (
                    <div className="text-lg text-main-three">
                        <a href={"/user/" + cellData} target="_blank">{cellData}</a>
                    </div>
                )}
                headerRenderer={() => <div className="text-lg">Player</div>}
                cellDataGetter={({ dataKey, rowData }) => {
                  if (rowData === undefined) {
                    return 0;
                  } else {
                    return rowData[dataKey];
                  }
                }}
              />
              <Column
                label="pp"
                dataKey="pp"
                width={60}
                cellRenderer={({ cellData }) => (
                  <div className="text-lg">{Math.floor(cellData)}</div>
                )}
                headerRenderer={() => <div className="text-lg">pp</div>}
                cellDataGetter={({ dataKey, rowData }) => {
                  if (rowData === undefined) {
                    return 0;
                  } else {
                    return rowData[dataKey];
                  }
                }}
              />
              
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
