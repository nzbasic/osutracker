import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css'

import Main from "./components/pages/Main";
import Header from "./components/molecules/Header";
import User from './components/pages/User'
import Country from './components/pages/Country'
import AllUsers from './components/pages/AllUsers'
import AllCountries from './components/pages/AllCountries'
import AddUser from './components/pages/AddUser'

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
        <Route path="/allusers" component={AllUsers} />
        <Route path="/allcountries" component={AllCountries} />
        <Route path="/add" component={AddUser} />
      </Switch>    
    </BrowserRouter>
  )
}

export default App;
