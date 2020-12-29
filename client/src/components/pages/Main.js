import React, { useState, useEffect } from "react";
import Header from "./../molecules/Header";
import NamesContainer from "../molecules/NamesContainer";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

export default function Main() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/players").then((response) => {
      setPlayers(response.data.map((user) => user.name));
    });
  });

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const dynamicSearch = () => {
    return players.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Header />
      <div className="w-screen flex flex-col self-center items-center py-20">
        <div>
          <TextField
            id="textfield"
            label="Search for a Player"
            variant="outlined"
            onChange={editSearchTerm}
            value={searchTerm}
          />
        </div>
        <div className="flex flex-col items-center">
          <NamesContainer names={dynamicSearch()} />
        </div>
        <h1>Stats for all users are updated hourly.</h1>
      </div>
    </div>
  );
}
