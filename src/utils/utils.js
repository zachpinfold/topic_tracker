import axios from 'axios'

export const fetchTopics = () => {
    return axios.get('https://pinny-news.herokuapp.com/api/topics').then(({data: {topics}}) => {
        return topics
    })
}

export const fetchArticles = (topic_slug) => {
    console.log(topic_slug)
    return axios.get('https://pinny-news.herokuapp.com/api/articles', 
    {
        params: 
        {topic: topic_slug}
    }
    ).then(({data: {articles}}) => {
        return articles
    })
}