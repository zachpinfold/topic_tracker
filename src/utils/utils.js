import axios from "axios";

export const fetchTopics = () => {
  return axios
    .get("https://pinny-news.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};

export const fetchArticles = (topic_slug, sort_by, order) => {
  return axios
    .get("https://pinny-news.herokuapp.com/api/articles", {
      params: { topic: topic_slug, sort_by: sort_by, order: order },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const fetchArticleById = (article_id) => {
  return axios
    .get(`https://pinny-news.herokuapp.com/api/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const fetchCommentsByArticleId = (article_id) => {
  return axios
    .get(`https://pinny-news.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const updateVoteById = (article_id, increment, comment) => {
  if (comment)  {
    return axios.patch(
      `https://pinny-news.herokuapp.com/api/comments/${article_id}`,
      { inc_votes: increment }
    );
  } else 
  return axios.patch(
    `https://pinny-news.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: increment }
  );
};

export const addCommentById = (article_id, comment) => {
  return axios.post(`https://pinny-news.herokuapp.com/api/articles/${article_id}/comments`, comment)
}

export const deleteCommentById = (comment_id) => {
  return axios.delete(`https://pinny-news.herokuapp.com/api/comments/${comment_id}`)
}