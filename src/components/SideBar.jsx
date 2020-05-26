import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/utils";

class SideBar extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <h1>(text) TOPIC TRACKER</h1>
          <h3>
            Discover and debate topics from all over the internet. Text only (no
            images) - the devil is in the detail.
          </h3>
          <h2>VIEW ARTICLES -></h2>
          <ul>
            {this.state.topics.map(({ slug }) => {
              return (
                <li key={slug}>
                  {" "}
                  <Link to={`/articles/topic/${slug}`}>{slug}</Link>
                </li>
              );
            })}
          </ul>
          <Link to={'/articles/'}>all articles</Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
