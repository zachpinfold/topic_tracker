import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";

class App extends Component {
  state = {
    user: "zach",
  };

  render() {
    return (
      <>
        <div id='hero--div'>
          <div id='hero--container--1'>
            <SideBar />
          </div>
          <div id='hero--container--2'>
            <Router>
              <ArticleList path='/'/>
              <ArticleList path='/articles/topic/:topic_slug'/>
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
