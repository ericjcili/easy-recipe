import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import MONGODB_URI from 'dotenv';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";


const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:pasword@cluster0.9cxdz.mongodb.net/recipe-list?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 3001;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);