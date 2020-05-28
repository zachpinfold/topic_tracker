import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import * as api from "./utils/utils";
import ErrorDisplay from "./components/ErrorDisplay";


class App extends Component {
  state = {
    username: "happyamy2016",
    colourLookUpObject: {},
  }; 

componentDidMount() {
  this.getTopicColours()
}

getTopicColours = () => {
  api.fetchTopics('lookUp').then((lookUp) => {
      this.setState({colourLookUpObject: lookUp})
    })
}

  render() {
    return (
      <>
        <div id='hero--div'>
          <div id='hero--container--1'>
            <SideBar />
          </div>
          <div id='hero--container--2'>
            <Router>
              <ArticleList colourLookUpObject={this.state.colourLookUpObject} path='/'/>
              <ArticleList colourLookUpObject={this.state.colourLookUpObject} path='/articles'/>
              <ArticleList colourLookUpObject={this.state.colourLookUpObject} path='/articles/topic/:topic_slug'/>
              <Article username={this.state.username} path='/articles/article/:article_id'/>
              <ErrorDisplay default/>
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
