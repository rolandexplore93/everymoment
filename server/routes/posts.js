import express from 'express';
import { getPosts, createPost, editPost, likePost, deletePost, deleteAllPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', editPost);
router.patch('/:id/likePost', likePost);
router.delete('/:id', deletePost);
router.delete('/', deleteAllPosts);

export default router;