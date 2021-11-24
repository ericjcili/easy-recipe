import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
const path = import('path');
import dotenv from 'dotenv/config';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";


const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:pasword@cluster0.9cxdz.mongodb.net/recipe-list?retryWrites=true&w=majority';
const PORT = 3001;

console.log(MONGODB_URI);

console.log(PORT);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);