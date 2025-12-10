import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

export const fetchArticles = () => api.get('/articles').then(r => r.data);
export const fetchArticle = (id) => api.get(`/articles/${id}`).then(r => r.data);
export const generateArticle = (topic) =>
  api.post('/articles/generate', { topic }).then(r => r.data);
