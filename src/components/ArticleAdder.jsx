import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as api from "../utils/utils";


class ArticleAdder extends Component {
  state = {
    body: "",
    topic: '-- select an option --',
    title: "Hello",
    optionSelect: false
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
    if (topic === '-- select an option --') {
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
    const { comment, topic, optionSelect } = this.state;
    return (
      <div>
        <button onClick={this.openArticleToggle}>Add Article</button>
        {optionSelect && <p>select a topic</p>}
        {comment && (
          <form onSubmit={this.handleArticleSubmit} className={"comment-form"}>
            <select onChange={this.handleInputChange} id="topics" name="topic">
              <option defaultValue>-- select an option --</option>
              <option value="coding">coding</option>
              <option value="football">football</option>
              <option value="cooking">cooking</option>
            </select>
            <textarea
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
              <p className={"comment-text"}>add article</p>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ArticleAdder;
