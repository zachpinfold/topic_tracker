import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from '../utils/utils'


class SideBar extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount()   {
    this.getTopics()
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
        this.setState({topics, isLoading: false})
    })
  }

  render() {
    if (this.state.isLoading) return <p>Loading...</p>
    return (
      <ul>
        {this.state.topics.map(({ slug }) => {
          return (
            <li key={slug}>
              {" "}
              <Link to={`/topics/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SideBar;
