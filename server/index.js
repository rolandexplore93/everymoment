import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

// Server and database setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening to the server at port: ${PORT}`));
import('./helpers/databaseConnection.js');

// Settle up middlewares
app.use(express.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000000 }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors({origin: true, credentials: true}));

app.use('/', postRoutes);
app.use('users', userRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to Everymoment server")
});
