import express from 'express';
import { signin, signup, getUsers } from '../controllers/users.js';

const userRoutes = express.Router();

userRoutes.post('/signin', signin);
userRoutes.post('/signup', signup);
userRoutes.get('/users', getUsers);

export default userRoutes;