import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Footer from "../molecules/Footer"
import Header from "../molecules/Header"

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

export default class AddUser extends Component {
  constructor() {
    super();
    this.state = { searchTerm: "", error: false, players: [], newPlayers: [] };

    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    axios.get("/players").then((response) => {
      this.setState({
        players: response.data.map((user) => user.name.toLowerCase()),
      });
    });
    axios.get("/newplayer").then((response) => {
      this.setState({
        newPlayers: response.data.map((user) => user.name.toLowerCase()),
      });
    });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.addUser(this.state.searchTerm);
    }
  }

  addUser(name) {
    if (!this.state.error && this.state.searchTerm != "") {
      axios.post("/newplayer/add", { player: name });
    }
    this.setState({
      searchTerm: "",
      error: false,
      players: [],
      newPlayers: [],
    });
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleError(boolean) {
    if (boolean) {
      if (!this.state.error) {
        this.setState({ error: true });
        return "User in database!";
      }
    } else {
      if (this.state.error) {
        this.setState({ error: false });
        return "";
      }
    }
  }

  errorState(searchTerm) {
    return (
      this.state.players.includes(searchTerm.toLowerCase()) ||
      this.state.players.includes(searchTerm.toLowerCase())
    );
  }



  render() {
    return (
      <div className="bg-main-two h-screen text-main-four">
        <Header />
        <div className="flex flex-col py-20 items-center">
          <h1>Add a new user</h1>
          <div className="py-5">
            <CssTextField
              id="textfield"
              label="Player to Add"
              variant="outlined"
              error={this.errorState(this.state.searchTerm)}
              helperText={
                this.errorState(this.state.searchTerm)
                  ? this.handleError(true)
                  : this.handleError(false)
              }
              onKeyDown={this.keyPress}
              onChange={this.handleChange}
              value={this.state.searchTerm}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </div>
          <div className="">
            <Button
              id="submit"
              variant="contained"
              onClick={() => this.addUser(this.state.searchTerm)}
            >
              Submit
            </Button>
          </div>
          <h1 className="py-5">
            All users will be manually approved by an admin, usually within 24
            hours, unless your request is denied.
          </h1>
          <h1>
            Stats are updated hourly, so you will not see any data until the
            next hour passes.
          </h1>
        </div>
        <div className="absolute bottom-0 w-screen">
          <Footer />  
        </div>
      </div>
    );
  }
}
