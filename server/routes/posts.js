import express from 'express';
import { getPosts, createPost, editPost, likePost, deletePost, deleteAllPosts } from '../controllers/posts.js';

const postRoutes = express.Router();

postRoutes.get('/posts', getPosts);
postRoutes.post('/posts', createPost);
postRoutes.patch('/posts/:id', editPost);
postRoutes.patch('/posts/:id/likePost', likePost);
postRoutes.delete('/posts/:id', deletePost);
postRoutes.delete('/posts', deleteAllPosts);

export default postRoutes;