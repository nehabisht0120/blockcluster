//@ts-check

import React, { Component } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AppWrapper } from "./App.styled";


class App extends Component {
 
  render() {
    return (
      <AppWrapper className="container-fluid">
          <Dashboard></Dashboard>
      </AppWrapper>
    );
  }
}

export default App;
