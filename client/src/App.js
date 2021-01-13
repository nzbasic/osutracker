import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserGraph from "./components/pages/UserGraph";
import Main from "./components/pages/Main";
import Admin from "./components/pages/Admin";
import AddUser from "./components/pages/AddUser";
import AllUser from "./components/pages/AllUser"
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/user/:name" component={UserGraph} />
          <Route path="/" exact component={Main} />
          <Route path="/add" component={AddUser} />
          <Route path="/all" component={AllUser} />
          <ProtectedRoute path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
