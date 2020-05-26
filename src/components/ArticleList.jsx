import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/utils";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    order: "desc",
    sort_by: "created_at",
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

  getArticles = () => {
    api
      .fetchArticles(
        this.props.topic_slug,
        this.state.sort_by,
        this.state.order
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

  voteCounter = (article_id, up_or_down) => {
    if (up_or_down === "up") {
      this.setState((currentState) => {
        const updatedArray = currentState.articles.map((article) => {
          if (article_id === article.article_id) {
            article.votes++;
          }
          return article;
        });

        return {
          list: updatedArray,
        };
      });
    } else {
      this.setState((currentState) => {
        const updatedArray = currentState.articles.map((article) => {
          if (article_id === article.article_id) {
            article.votes--;
          }
          return article;
        });

        return {
          list: updatedArray,
        };
      });
    }
  };

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
                <ArticleCard {...article} voteCounter={this.voteCounter} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
