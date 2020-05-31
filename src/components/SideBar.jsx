import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/utils";


class SideBar extends Component {
  state = {
    topics: [],
    isLoading: true,
    activeButton: 'all_articles'
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  makeButtonActive = (slug) =>  {
    this.setState({activeButton: slug})
  }

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
                  <Link onClick={() => this.makeButtonActive(slug)} className={"links"} to={`/articles/topic/${slug}`}>
                    <p
                      style={{ backgroundColor: color, color: "white" }}
                      className={this.state.activeButton === slug ? "navbuttons---topics---selected" : 'navbuttons---topics---faded'}
                    >
                      {slug}
                    </p>
                    
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link onClick={() => this.makeButtonActive('all_articles')} id={this.state.activeButton === 'all_articles' ? 'all--articles--button--selected' : 'all--articles--button--faded'} to={"/articles/"}>
            <p>all articles</p>
          </Link>


        </div>

      </div>
    );
  }
}

export default SideBar;
