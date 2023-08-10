import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })  // localhost environment
// const API = axios.create({ baseURL: 'https://everymoment.onrender.com' });  // deployment

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchPosts = () => API.get('/posts');
export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags === '' ? 'none' : searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const editPost = (currentId, updatedPost) => API.patch(`/posts/${currentId}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (currentId) => API.delete(`/posts/${currentId}`);

export const login = (formData) => API.post('/users/login', formData);
export const signup = (formData) => API.post('/users/signup', formData);