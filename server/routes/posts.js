import express from 'express';
import { getPosts, createPost, editPost, likePost, deletePost, deleteAllPosts, getPostsBySearch } from '../controllers/posts.js';
import { isAuthorize } from '../middleware/auth.js';

const postRoutes = express.Router();

// postRoutes.get('/posts', isAuthorize, getPosts);
postRoutes.get('/posts', isAuthorize, getPosts);
postRoutes.get('/posts/search', isAuthorize, getPostsBySearch);
postRoutes.post('/posts', isAuthorize, createPost);
postRoutes.patch('/posts/:id', isAuthorize, editPost);
postRoutes.patch('/posts/:id/likePost', isAuthorize, likePost);
postRoutes.delete('/posts/:id', isAuthorize, deletePost);
postRoutes.delete('/posts', deleteAllPosts);

export default postRoutes;