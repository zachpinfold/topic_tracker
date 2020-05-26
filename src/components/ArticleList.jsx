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
    if (prevProps.topic_slug !== this.props.topic_slug || prevState.order !== this.state.order) {
      this.getArticles();
    }
    // || prevState.order !== this.state.order//
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

//   order: currentState.order === 'asc' ? 'desc' : 'asc',


  toggleSortBy(sort_by) {
    this.setState((currentState) => {
        return {
            order: currentState.order === 'desc' ? 'asc' : 'desc',
            sort_by: sort_by
        }
    })
    // flip the state of order //
    // sort_by needs to be date //
    // argument changes the sort by //
  }


  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    return (
      <div>
        <button onClick={() => this.toggleSortBy('created_at')}>sort by date</button>
        <button onClick={() => this.toggleSortBy('comment_count')}>sort by comments</button>
        <button onClick={() => this.toggleSortBy('votes')}>sort by votes</button>
        <ul>
          {this.state.articles.map((article) => {
            return (
              <li key={article.article_id}>
                <ArticleCard {...article} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticleList;
