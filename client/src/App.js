import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";

import Main from "./components/pages/Main";
import Header from "./components/molecules/Header";
import User from "./components/pages/User";
import Country from "./components/pages/Country";
import CountryUserList from "./components/pages/CountryUserList";
import AllUsers from "./components/pages/AllUsers";
import AllCountries from "./components/pages/AllCountries";
import AddUser from "./components/pages/AddUser";
import Stats from "./components/pages/Stats";
import Footer from "./components/molecules/Footer";
import UserRedirect from "./components/pages/UserRedirect";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col max-w-screen">
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/country/:name" component={Country} />
          <Route path="/allusers/:country" component={CountryUserList} />
          <Route path="/user/:id" component={User} />
          <Route path="/allusers" component={AllUsers} />
          <Route path="/allcountries" component={AllCountries} />
          <Route path="/add" component={AddUser} />
          <Route path="/stats" component={Stats} />
          <Route path="/redirect/:name" component={UserRedirect} />
        </Switch>
        {window.location.pathname !== "/add" ? <Footer /> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
