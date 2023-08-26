import env from 'dotenv';
env.config();
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import recipeRouter from './routers/recipeRouter';
import profileRouter from './routers/profileRouter';
import connectToDatabase from './db/mongoose';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/avatar', express.static('avatar'));
app.use('/recipes', express.static('recipes'));

// Routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/profiles', profileRouter);

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port: ' + SERVER_PORT);
  connectToDatabase();
});
