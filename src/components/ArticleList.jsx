import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/utils";
import Pagination from "./Pagination";
import ErrorDisplay from "./ErrorDisplay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faComment, faStar } from '@fortawesome/free-solid-svg-icons'

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    order: "desc",
    sort_by: "created_at",
    page_number: 1,
    article_limit: null,
    err: '',
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

  makeArticleLimit = (total_count) => {
    const article_limit = Math.ceil(((total_count / 10) * 10)/10)
    this.setState({
       article_limit: article_limit
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
        })
      }).catch((err) => {
        console.log(err.response)
        this.setState({err: err.response.data.msg, isLoading: false})
      })
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
    const {colourLookUpObject} = this.props
    const {sort_by, order} = this.state
    console.log(sort_by)
    if (this.state.isLoading) return <p>Loading...</p>;
    if (this.state.err) return <ErrorDisplay msg={this.state.err}/>
    return (
      <div>
        <div className={'sort-button-div'}>

        <button className={sort_by === 'created_at' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => this.toggleSortBy("created_at")}>
        <FontAwesomeIcon className={sort_by === 'created_at' ? "sort-icon-show" : 'sort-icon-hide '} icon={faStar}/> <p className={order === 'asc' && sort_by === 'created_at'  ? 'icon-hide-text' : 'icon-show-text'}> New</p> <p className={order === 'asc' && sort_by === 'created_at' ? 'icon-show-text' : 'icon-hide-text'}> Old</p> 
        </button>

        <button className={sort_by === 'comment_count' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => this.toggleSortBy("comment_count")}>
        <FontAwesomeIcon className={sort_by === 'comment_count' ? "sort-icon-show" : 'sort-icon-hide '} icon={faComment}/> <p className={order === 'asc' && sort_by === 'comment_count'  ? 'icon-hide-text' : 'icon-show-text'}> Most Comments</p> <p className={order === 'asc' && sort_by === 'comment_count' ? 'icon-show-text' : 'icon-hide-text'}> Least Comments</p> 
        </button>

                <button className={sort_by === 'votes' ? "sort-button-selected" : 'sort-button-deselected'} onClick={() => this.toggleSortBy("votes")}>
        <FontAwesomeIcon className={sort_by === 'votes' ? "sort-icon-show" : 'sort-icon-hide '} icon={faChartLine}/> <p className={order === 'asc' && sort_by === 'votes'  ? 'icon-hide-text' : 'icon-show-text'}> Most Votes</p> <p className={order === 'asc' && sort_by === 'votes' ? 'icon-show-text' : 'icon-hide-text'}> Least Votes</p> 
        </button>

        </div>
        <ul>
          {this.state.articles.map((article) => {
            return (
              <li key={article.article_id}>
                <ArticleCard {...article} colourLookUpObject={colourLookUpObject} />
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
