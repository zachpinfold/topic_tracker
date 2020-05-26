import axios from 'axios'

export const fetchTopics = () => {
    return axios.get('https://pinny-news.herokuapp.com/api/topics').then(({data: {topics}}) => {
        return topics
    })
}