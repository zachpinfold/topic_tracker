import axios from 'axios'

export const fetchTopics = () => {
    return axios.get('https://pinny-news.herokuapp.com/api/topics').then(({data: {topics}}) => {
        return topics
    })
}

export const fetchArticles = (topic_slug, sort_by, order) => {
    return axios.get('https://pinny-news.herokuapp.com/api/articles', 
    {
        params: 
        {topic: topic_slug,
        sort_by: sort_by,
        order: order
        }
    }
    ).then(({data: {articles}}) => {
        return articles
    })
}

