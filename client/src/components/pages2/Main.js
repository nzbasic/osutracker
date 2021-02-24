import React, { useState, useEffect } from "react";
import Header from "../molecules/Header2";
import Footer from '../molecules/Footer2'
import NamesContainer from "../molecules/NamesContainer";
import axios from "axios";
import Loader from 'react-loader-spinner'
import '../../css/Graph.css'
import CssTextField from '../atoms/CssTextField'
import Button from '@material-ui/core/Button'

export default function Main() {
  const [players, setPlayers] = useState([]);
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/players").then((response) => {
      let playerList = []
      response.data.forEach(user => {
        user.type = "player"
        playerList.push(user)
      })
      setPlayers(playerList);
      setLoading(false)
    });


    axios.get("/country/nameAbr").then(response => {
      let countryList = []
      response.data.forEach(country => {
        country.type = "country"
        countryList.push(country)
      })
      setCountries(countryList)
    })
  },[]);

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const dynamicSearch = () => {

    let combined = players.concat(countries)

    let filter = combined.filter((name) =>
      name.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filter
  };

  return (
    isLoading ? 
    <div className="h-screen bg-main-two">
        <div className="load">
            <Loader id="spinner" type="ThreeDots" />
        </div>
    </div> : 
    <div className="bg-main-two min-h-screen">
      <Header />
      <div className="w-screen flex flex-col self-center items-center py-10 text-main-four text-center">
        <div>
          <CssTextField
            label="Search for a Player or Country"
            onChange={editSearchTerm}
            value={searchTerm}
          />
        </div>
        <div className="flex flex-col items-center py-2">
          <NamesContainer names={dynamicSearch()} />
        </div>
        <h1 className="py-2">Stats for all users are updated every three hours. Countries daily.</h1>
        <h1 className="py-2">Currently tracking {players.length} users and {countries.length} countries.</h1>
        <div className="py-2 flex flex-col">
          <Button color="primary" href="/all" variant="contained">View All Users</Button>
          <div className="py-2">
            <Button color="primary" href="/allCountry" variant="contained">View All Countries</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-screen">
        <Footer />  
      </div>
    </div>
  );
}
