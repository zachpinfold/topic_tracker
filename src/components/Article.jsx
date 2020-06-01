import React, { Component } from "react";
import ArticleCommentCard from "./ArticleCommentCard";
import * as api from "../utils/utils";
import CommentAdder from "./CommentAdder";
import ArticleVoteUpdator from "./ArticleVoteUpdator";
import ErrorDisplay from "./ErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import SortByButtons from "./SortByButtons";
import TimeAgo from "react-timeago";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    articleComments: [],
    err: "",
    order: "desc",
    sort_by: "created_at",
    createdAt: '',
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
    const queries = [api.fetchArticleById(article_id), api.fetchCommentsByArticleId(article_id, order, sort_by)]
    Promise.all(queries)
    .then((article) => {
      const articleContent = article[0]
      const articleComments = article[1]
      this.setState({ article: articleContent, isLoading: false, articleComments: articleComments });//
      this.dateFormatter(this.state.article.created_at); 
    }).catch((err) => {
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
  };

  dateFormatter = (createdAt) => {
    const date = new Date(createdAt);
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(date);
    const result = `${day}-${month}-${year}`;
    this.setState({ createdAt: result });
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    if (this.state.err) return <ErrorDisplay msg={this.state.err} />;
    const { colourLookUpObject } = this.props;
    const { order, sort_by } = this.state;
    const {
      article_id,
      topic,
      title,
      body,
      author,
      votes,
    } = this.state.article;
    return (
      <div className={"article-div"}>
        <div className={"article-div-copy"}>
          <p className={"article-topic"}>
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

          {this.state.createdAt && <TimeAgo date={this.state.createdAt} className={"article-date"} />}
          <p className={"article-username"}>{author}</p>

          <p className={"article-body"}>{body}</p>
          <ArticleVoteUpdator votes={votes} id={article_id} />
        </div>
        <h2>COMMENTS</h2>
        <CommentAdder
          username={this.props.username}
          article_id={article_id}
          addComments={this.addComments}
        />
        <SortByButtons
          toggleSortBy={this.toggleSortBy}
          sort_by={sort_by}
          order={order}
        />
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
