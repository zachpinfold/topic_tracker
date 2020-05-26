import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import SideBar from "./components/SideBar";

class App extends Component {
  state = {
    user: "zach",
  };

  render() {
    return (
      <div>
        <SideBar />
        <Router>
          
        </Router>
      </div>
    );
  }
}

export default App;
