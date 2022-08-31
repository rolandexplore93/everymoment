import express from 'express';
import { getPosts, createPost, deleteAllPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/', deleteAllPosts);

export default router;