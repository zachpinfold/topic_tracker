import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import * as api from "../utils/utils";

class ArticleList extends Component {

    state = {
        "articles": [],
        isLoading: true,
      };

    componentDidMount() {
        this.getArticles()
    }

    componentDidUpdate(prevProps, prevState)    {
        if (prevProps.topic_slug !== this.props.topic_slug) {
            this.getArticles()
        }
    }

    getArticles = () => {
        api.fetchArticles(this.props.topic_slug).then((articles) => {
            this.setState({articles, isLoading: false})
        })
    }

    render() {
        if (this.state.isLoading) return <p>Loading...</p>;
        return (
            <div>
                <ul>
                    {this.state.articles.map(article => {
                        return (
                        <li key={article.article_id}>
                            <ArticleCard {...article}/>
                        </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default ArticleList;