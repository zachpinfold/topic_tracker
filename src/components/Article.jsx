import React, { Component } from "react";
import ArticleCommentCard from "./ArticleCommentCard";
import * as api from "../utils/utils";
import CommentAdder from "./CommentAdder";
import ArticleVoteUpdator from "./ArticleVoteUpdator";
import ErrorDisplay from "./ErrorDisplay";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    articleComments: [],
    err: "",
    order: "desc",
    sort_by: "created_at",
  };

  addComments = ({ comment }) => {
    this.setState((currentState) => {
      return {
        articleComments: [comment, ...currentState.articleComments],
      };
    });
  };

  deleteComments = (comment_id) => {
    api.deleteCommentById(comment_id);
    this.setState((currentState) => {
      const itemToDelete = currentState.articleComments.findIndex(
        (comment) => comment.comment_id === comment_id
      );
      currentState.articleComments.splice(itemToDelete, 1);
      return {
        articleComments: currentState.articleComments,
      };
    });
  };

  componentDidMount() {
    this.getArticle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.order !== this.state.order) {
      this.getArticle();
    }
  }

  getArticle = () => {
    const { article_id } = this.props;
    const { order, sort_by } = this.state;
    api
      .fetchArticleById(article_id)
      .then((article) => {
        this.setState({ article });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false });
      });
    api
      .fetchCommentsByArticleId(article_id, order, sort_by)
      .then((comments) => {
        this.setState({ articleComments: comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg, isLoading: false });
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
    if (this.state.err) return <ErrorDisplay msg={this.state.err} />;
    const { colourLookUpObject } = this.props;
    const {
      article_id,
      topic,
      title,
      body,
      created_at,
      author,
      votes,
    } = this.state.article;
    console.log(colourLookUpObject);
    return (
      <div className={"article-div"}>
        <div>
          <div className={"article-topic-div"}>
            <p
              className={"article-topic"}
              style={{ backgroundColor: colourLookUpObject[topic] }}
            >
              {topic}
            </p>
          </div>
          <p className={'article-title'}>{title}</p>
          <p className={'article-date'}>{created_at}</p>
          <p className={'article-body'}>{body}</p>
          <p className={'article-card-username'}>{author}</p>
          <ArticleVoteUpdator votes={votes} id={article_id} />
        </div>
        <CommentAdder
          username={this.props.username}
          article_id={article_id}
          addComments={this.addComments}
        />
        <button onClick={() => this.toggleSortBy("created_at")}>
          sort by date
        </button>
        <button onClick={() => this.toggleSortBy("votes")}>
          sort by votes
        </button>
        <div>
          <ul>
            {this.state.articleComments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <ArticleCommentCard
                    username={this.props.username}
                    {...comment}
                    deleteComments={this.deleteComments}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Article;
