import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";

import Main from "./components/pages/Main";
import Header from "./components/molecules/Header";
import User from "./components/pages/User";
import Country from "./components/pages/Country";
import AllUsers from "./components/pages/AllUsers";
import AllCountries from "./components/pages/AllCountries";
import AddUser from "./components/pages/AddUser";
import Stats from "./components/pages/Stats";
import UserRedirect from "./components/pages/UserRedirect";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/country/:name" component={Country} />
        <Route path="/user/:id" component={User} />
        <Route path="/allusers" component={AllUsers} />
        <Route path="/allcountries" component={AllCountries} />
        <Route path="/add" component={AddUser} />
        <Route path="/stats" component={Stats} />
        <Route path="/redirect/:name" component={UserRedirect} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
