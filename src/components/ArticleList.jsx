import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/utils";
import Pagination from "./Pagination";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    order: "desc",
    sort_by: "created_at",
    // page_number: 1
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic_slug !== this.props.topic_slug ||
      prevState.order !== this.state.order
    ) {
      this.getArticles();
    }
  }

  getArticles = (pageNumber) => {
    console.log(pageNumber)
    api
      .fetchArticles(
        this.props.topic_slug,
        this.state.sort_by,
        this.state.order,
        pageNumber
      )
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      });
  };

  toggleSortBy(sort_by) {
    this.setState((currentState) => {
      return {
        order: currentState.order === "desc" ? "asc" : "desc",
        sort_by: sort_by,
      };
    });
  }


  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    return (
      <div>
        <button onClick={() => this.toggleSortBy("created_at")}>
          sort by date
        </button>
        <button onClick={() => this.toggleSortBy("comment_count")}>
          sort by comments
        </button>
        <button onClick={() => this.toggleSortBy("votes")}>
          sort by votes
        </button>
        <ul>
          {this.state.articles.map((article) => {
            return (
              <li key={article.article_id}>
                <ArticleCard {...article} />
              </li>
            );
          })}
        </ul>
        <Pagination getArticles={this.getArticles}/>
      </div>
    );
  }
}

export default ArticleList;
