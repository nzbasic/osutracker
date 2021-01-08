import React, { useState, useEffect } from "react";
import Header from "./../molecules/Header";
import Footer from './../molecules/Footer'
import NamesContainer from "../molecules/NamesContainer";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/styles'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiFormHelperText': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'lightblue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightblue',
      },
    },
  },
})(TextField);

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
            id="textfield"
            label="Search for a Player"
            variant="outlined"
            InputLabelProps={{
              style: { color: 'white' },
            }}
            onChange={editSearchTerm}
            value={searchTerm}
          />
        </div>
        <div className="flex flex-col items-center py-2">
          <NamesContainer names={dynamicSearch()} />
        </div>
        <h1 className="text-main-four py-2">Stats for all users are updated hourly.</h1>
      </div>
      <div className="absolute bottom-0 w-screen">
        <Footer />  
      </div>
    </div>
  );
}
