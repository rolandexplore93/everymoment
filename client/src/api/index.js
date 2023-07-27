import axios from 'axios';

// const url = 'https://everymoment.herokuapp.com/posts';
// const url = 'https://everymoment.onrender.com/posts'
const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const editPost = (currentId, updatedPost) => axios.patch(`${url}/${currentId}`, updatedPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const deletePost = (currentId) => axios.delete(`${url}/${currentId}`);