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
        <div id={"navbar"}>
          <h1 className="hero-title">TOPIC TRACKER</h1>
          <h3>
            Discover and debate topics from all over the internet. Text only (no
            images) - the devil is in the detail.
          </h3>
          <h2>VIEW ARTICLES BY TOPIC -></h2>
          <ul className={"topic---button---wrapper"} style={{marginBlockStart: '0', marginBlockEnd: '0', paddingInlineStart: '0'}}>
            {this.state.topics.map(({ slug, color }) => {
              return (
                <li key={slug}>
                  <Link className={"links"} to={`/articles/topic/${slug}`}>
                    <p
                      style={{ backgroundColor: color, color: "white" }}
                      className={"navbuttons---topics"}
                    >
                      {slug}
                    </p>
                    
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link id={'all--articles--button'} to={"/articles/"}>
            <p>all articles</p>
          </Link>


        </div>

      </div>
    );
  }
}

export default SideBar;
