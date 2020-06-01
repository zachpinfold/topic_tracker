import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import * as api from "./utils/utils";
import ErrorDisplay from "./components/ErrorDisplay";
import Username from "./components/Username";


class App extends Component {
  state = {
    username: "happyamy2016",
    avatar: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
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
    const {avatar, username} = this.state
    return (
      <>
        <div id='hero--div'>
          <div id='hero--container--1'>
            <Username avatar={avatar} username={username}  />
            <SideBar/>
          </div>
          <div id='hero--container--2'>
            <Router>
              <ArticleList username={this.state.username} colourLookUpObject={this.state.colourLookUpObject} path='/'/>
              <ArticleList username={this.state.username} colourLookUpObject={this.state.colourLookUpObject} path='/articles'/>
              <ArticleList username={this.state.username} colourLookUpObject={this.state.colourLookUpObject} path='/articles/topic/:topic_slug'/>
              <Article username={this.state.username} colourLookUpObject={this.state.colourLookUpObject} path='/articles/article/:article_id'/>
              <ErrorDisplay default/>
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
