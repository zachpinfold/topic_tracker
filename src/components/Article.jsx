import React, { Component } from "react";
import ArticleCommentCard from "./ArticleCommentCard";
import * as api from "../utils/utils";

class Article extends Component {
  state = {
    article: {},
    ArticleComments: []
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
        console.log(comments)
        this.setState({ArticleComments: comments})
    })
}

// getComments = () => {
//     const {article_id} = this.props
//     api.fetchCommentsByArticleId(article_id).then((comments) => {
//         console.log(comments)
//         this.setState({ArticleComments: comments})
//     })
// }

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
        <div>
            <ul>
                {this.state.ArticleComments.map((comment)=> {
                    return (
                    <li key={comment.comment_id}>
                        <ArticleCommentCard {...comment}/>
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
