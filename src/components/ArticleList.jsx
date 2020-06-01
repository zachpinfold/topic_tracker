import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import * as api from "../utils/utils";
import Pagination from "./Pagination";
import ErrorDisplay from "./ErrorDisplay";
import SortByButtons from "./SortByButtons";

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
    // seperate if() for if topic changes and page number needs to go back to one
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.setState({page_number: 1})
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


  toggleSortBy = (sort_by) => {
    console.log(this)
    this.setState((currentState) => {
      return {
        order: currentState.order === "desc" ? "asc" : "desc",
        sort_by: sort_by,
      };
    });
  }

    //getTheme () {
    
    // }


  render() {
    const {colourLookUpObject} = this.props
    const {sort_by, order} = this.state
    if (this.state.isLoading) return <p>Loading...</p>;
    if (this.state.err) return <ErrorDisplay msg={this.state.err}/>

    return (
      <div className={'right-column'}>

        <SortByButtons sort_by={sort_by} order={order} toggleSortBy={this.toggleSortBy} article={'article'}/>

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
