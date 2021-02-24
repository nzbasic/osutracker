import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css'

import UserGraph from "./components/pages2/UserGraph";
import Main from "./components/pages/Main";
import Admin from "./components/pages2/Admin";
import AddUser from "./components/pages2/AddUser";
import AllUser from "./components/pages2/AllUser"
import AllCountry from './components/pages2/AllCountry'
import CountryGraph from "./components/pages2/CountryGraph"
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/molecules/Header";
import Footer from './components/molecules/Footer'
import User from './components/pages/User'
import Country from './components/pages/Country'

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <Switch>
//           <Route path="/user/:name" component={UserGraph} />
//           <Route path="/" exact component={Main} />
//           <Route path="/add" component={AddUser} />
//           <Route path="/all" component={AllUser} />
//           <Route path="/allCountry" component={AllCountry} />
//           <Route path="/country/:country" component={CountryGraph} />
//           <ProtectedRoute path="/admin" component={Admin} />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/country/:name" component={Country} />
        <Route path="/user/:id" component={User} />
      </Switch>    
    </BrowserRouter>
  )
}

export default App;
