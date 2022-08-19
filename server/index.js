import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js'

const app = express();

app.use('/posts', postRoutes)
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(result => app.listen(PORT, console.log(`Listening to the server at port: ${PORT}`)))
    .catch(err => console.log(err.message + ": unable to connect to the database"))

