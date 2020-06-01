import React, { Component } from "react";
import ArticleCommentCard from "./ArticleCommentCard";
import * as api from "../utils/utils";
import CommentAdder from "./CommentAdder";
import ArticleVoteUpdator from "./ArticleVoteUpdator";
import ErrorDisplay from "./ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import SortByButtons from "./SortByButtons";

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

  toggleSortBy = (sort_by) => {
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
    const {order, sort_by} = this.state
    const {
      article_id,
      topic,
      title,
      body,
      created_at,
      author,
      votes,
    } = this.state.article;
    return (
      <div className={"article-div"}>
        <div className={"article-div-copy"}>
        <p
            className={"article-topic"}
          >
            <FontAwesomeIcon
              style={{
                marginRight: "7px",
                fontSize: "12px",
                color: colourLookUpObject[topic],
                borderRadius: "10px",
                outline: "none",
                borderColor: colourLookUpObject[topic],
                boxShadow: `0 0 5px ${colourLookUpObject[topic]}`,
              }}
              icon={faCircle}
            />
            {topic}
          </p>
          <p className={"article-title"}>{title}</p>
          <p className={"article-date"}>{created_at}</p>

          <p className={"article-body"}>{body}</p>
          <p className={"article-card-username"}>{author}</p>
          <ArticleVoteUpdator votes={votes} id={article_id} />
        
        </div>
        <h2>COMMENTS</h2>
        <CommentAdder
          username={this.props.username}
          article_id={article_id}
          addComments={this.addComments}
        />
        <SortByButtons  toggleSortBy={this.toggleSortBy} sort_by={sort_by} order={order}/>
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
