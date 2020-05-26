import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";


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
              <ArticleList path='/articles'/>
              <ArticleList path='/articles/topic/:topic_slug'/>
              <Article path='/articles/article/:article_id'/>
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
