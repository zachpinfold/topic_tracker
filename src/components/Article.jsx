import React, { Component } from "react";
import ArticleCommentCard from "./ArticleCommentCard";
import * as api from "../utils/utils";
import CommentAdder from "./CommentAdder";

class Article extends Component {
  state = {
    article: {},
    articleComments: []
  }

addComments = ({comment}) => {
  console.log(comment)
  this.setState((currentState) => {
    return {
      articleComments: [comment, ...currentState.articleComments]
    }
  })
  // use currentState
  // spead and comma to push the comment in
}

componentDidMount()    {
    this.getArticle()
    // this.getComments()
}

getArticle = () => {
    const {article_id} = this.props
    api.fetchArticleById(article_id).then((article) => {
        this.setState({article})
    })
    api.fetchCommentsByArticleId(article_id).then((comments) => {
        this.setState({articleComments: comments})
    })
}

  render() {
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
      <div>
        <div>
            <p> article_id: {article_id}</p>
          <p>{topic}</p>
          <p>{title}</p>
          <p>{body}</p>
          <p>{created_at}</p>
          <p>{author}</p>
          <p>votes: {votes}</p>
          <button>Vote Up</button>
          <button>Vote Down</button>
        </div>
        <CommentAdder username={this.props.username} article_id={article_id} addComments={this.addComments}/>
        <div>
            <ul>
                {this.state.articleComments.map((comment)=> {
                    return (
                    <li key={comment.comment_id}>
                        <ArticleCommentCard username={this.props.username} {...comment}/>
                    </li>
                    )
                })}
            </ul>
        </div>
      </div>
    );
  }
}

export default Article;
