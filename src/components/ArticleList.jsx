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
    page_number: 1,
    article_limit: null
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic_slug !== this.props.topic_slug ||
      prevState.order !== this.state.order ||
      prevState.page_number !== this.state.page_number
    ) {
      this.getArticles();
    }
  }

  handlePageUpdate = (pageDirection) => {
    this.setState(({page_number}) => {
        return  {
          page_number: page_number + pageDirection
        }
    })
  }

  getArticles = () => {
    api
      .fetchArticles(
        this.props.topic_slug,
        this.state.sort_by,
        this.state.order,
        this.state.page_number
      )
      .then((articles) => {
        const {total_count} = articles[0]
        this.makeArticleLimit(total_count)
        this.setState({
          articles,
          isLoading: false,
        });
      });
  };

  makeArticleLimit = (total_count) => {
   const article_limit = Math.ceil(((total_count / 10) * 10)/10)
   this.setState({
      article_limit: article_limit
    })
  }

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
        <Pagination page_number={this.state.page_number} handlePageUpdate={this.handlePageUpdate} article_limit={this.state.article_limit}/>
      </div>
    );
  }
}

export default ArticleList;
