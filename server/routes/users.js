import express from 'express';
import { login, signup, getUsers } from '../controllers/users.js';
import { isAuthorize } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/users/login', login);
userRoutes.post('/users/signup', signup);
userRoutes.get('/users', getUsers);

export default userRoutes;