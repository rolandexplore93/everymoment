import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000000 }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors({origin: true, credentials: true}));

app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(result => app.listen(PORT, console.log(`Listening to the server at port: ${PORT}`)))
    .catch(err => console.log(err.message + ": unable to connect to the database"))

