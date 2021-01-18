import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../molecules/Header";
import UserTable from "../molecules/UserTable";
import Loader from 'react-loader-spinner'
import "../../css/Graph.css";
import { Column, Table } from 'react-virtualized'
import Image from '../atoms/Image'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

export default function AllCountry() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/country/namePpAbr").then((response) => {
      let data = response.data;
      let out = [];
      for (let i = 0; i < data.length; i++) {
        out.push({
          name: data[i].name,
          pp: data[i].pp,
          abbreviation: data[i].abbreviation,
        });
      }
      out.sort((a,b) => a.pp < b.pp)
      setCountries(out);
      setLoading(false)
    });
  }, []);

  return (
    isLoading ? 
    <div className="h-screen bg-main-two">
        <div className="load">
            <Loader id="spinner" type="ThreeDots" />
        </div>
    </div> : 
    <div className="h-screen bg-main-two flex flex-col">
      <Header />
      <div className="py-2 flex flex-col px-2 bg-main-two h-full">
        <AutoSizer className="text-main-four">
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={30}
              rowHeight={30}
              rowCount={countries.length}
              rowGetter={({ index }) => {
                if (countries) {
                  return countries[index];
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
                label="#"
                dataKey="name"
                width={55}
                cellRenderer={({ rowIndex }) => (
                  <div className="text-lg">{rowIndex + 1}</div>
                )}
                headerRenderer={() => <div className="text-lg">#</div>}
                cellDataGetter={({ dataKey, rowData }) => {
                  if (rowData === undefined) {
                    return 0;
                  } else {
                    return rowData[dataKey];
                  }
                }}
              />
              <Column
                label="Country"
                dataKey="name"
                width={200}
                cellRenderer={({ cellData, rowIndex }) => (
                    <div className="text-lg text-main-three flex flex-row">
                        <a href={"/country/" + cellData} target="_blank">{cellData}</a>
                        <div className="self-center px-2">
                            <Image
                                height={20}
                                width={30}
                                link={
                                "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                                countries[rowIndex].abbreviation +
                                ".svg"
                                }
                            />
                        </div>
                    </div>
                )}
                headerRenderer={() => <div className="text-lg">Country</div>}
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
