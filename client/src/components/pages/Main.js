import React, { useState, useEffect } from "react";
import Header from "./../molecules/Header";
import Footer from './../molecules/Footer'
import NamesContainer from "../molecules/NamesContainer";
import axios from "axios";
import CssTextField from '../atoms/CssTextField'

export default function Main() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/players").then((response) => {
      setPlayers(response.data.map((user) => user.name));
    });
  },[]);

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const dynamicSearch = () => {
    return players.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="bg-main-two h-screen">
      <Header />
      <div className="w-screen flex flex-col self-center items-center py-10">
        <div>
          <CssTextField
            label="Search for a Player"
            onChange={editSearchTerm}
            value={searchTerm}
          />
        </div>
        <div className="flex flex-col items-center py-2">
          <NamesContainer names={dynamicSearch()} />
        </div>
        <h1 className="text-main-four py-2">Stats for all users are updated every three hours.</h1>
        <h1 className="text-main-four py-2">Currently tracking {players.length} users.</h1>
      </div>
      <div className="absolute bottom-0 w-screen">
        <Footer />  
      </div>
    </div>
  );
}
