import express from 'express';
import userRouter from './routes/user.js';
import { connectMongoDb } from './connection.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limiter } from './utils/middlewares.js';
import dotenv from 'dotenv';
import postRouter from './routes/posts.js';
import productRouter from './routes/products.js';

dotenv.config();

const app = express();

connectMongoDb(process.env.MONGO_URI); //connect to mongodb

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(limiter); // rate limiter

app.use('/', userRouter); // user routes
app.use('/posts', postRouter); // posts routes

app.use('/products', productRouter); // products routes

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
