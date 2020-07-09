import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as api from "../utils/utils";


class ArticleAdder extends Component {
  state = {
    body: "",
    topic: '-- select a topic --',
    title: "",
    optionSelect: false,
    comment: false,
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleArticleSubmit = (event) => {
    event.preventDefault();
    const {topic, title, body} = this.state
    const {username} = this.props
    const article = {
        title: title, 
        author: username,
        body: body,
    }
    if (topic === '-- select a topic --') {
        this.setState({optionSelect: true})
    }
    else{
        api.postArticleByTopicId(topic, article).then(({data}) => {
            this.props.addArticle(data)
        })
    }
  };

  openArticleToggle = () => {
    this.setState((currentState) => {
      return {
        comment: currentState.comment === false ? true : false,
      };
    });
  };


  render() {
    const { comment, optionSelect } = this.state;
    return (
      <div>
        <div className={!comment ? "add-article-div" : 'add-article-div-open'}>
              <button onClick={this.openArticleToggle} className={"add-article-button"}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p className={"add-article-text"}>ADD NEW ARTICLE</p>
            </div>

        {comment && (
          <form onSubmit={this.handleArticleSubmit} className={"comment-form"}>
            <div className={'select-topic-div'}>
            <select className={'select-topic'} onChange={this.handleInputChange} id="topics" name="topic">
              <option  defaultValue>-- select a topic --</option>
              <option  value="coding">coding</option>
              <option  value="football">football</option>
              <option  value="cooking">cooking</option>
            </select>
            {optionSelect && <p className={'select-warning-copy'}>select a topic</p>}
            </div>
            <textarea
            className={'article-title-form'}
              name="title"
              required
              type="text"
              onChange={this.handleInputChange}
              value={this.state.title}
              placeholder="title..."
            />
            <textarea
              name="body"
              required
              type="text"
              onChange={this.handleInputChange}
              value={this.state.body}
              placeholder="what do you have to say?"
            />
            <div className={"comment-button-div"}>
              <button className={"add-comment-button"}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <p className={"comment-text"}>post article</p>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ArticleAdder;
