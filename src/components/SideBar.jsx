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
        <div id={'navbar'}>
          <h1>TOPIC TRACKER</h1>
          <h3>
            Discover and debate topics from all over the internet. Text only (no
            images) - the devil is in the detail.
          </h3>
          <h2>VIEW ARTICLES -></h2>
          <ul >
            {this.state.topics.map(({ slug, color }) => {
              return (
                <li id={'topic---button---wrapper'} key={slug}>
                  {" "}
                  <Link className={'links'} to={`/articles/topic/${slug}`}>
                    <p style={
                  {'backgroundColor': color}  
                  }  
                  className={'navbuttons---topics'}>{slug}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link id={'all--link'}  to={'/articles/'}>all articles</Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
