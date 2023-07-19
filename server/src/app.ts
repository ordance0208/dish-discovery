import env from 'dotenv';
env.config();
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
const SERVER_PORT = process.env.SERVER_PORT || 8000;
import connectToDatabase from './db/mongoose';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/avatar', express.static('avatar'));

// Routers
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port: ' + SERVER_PORT);
  connectToDatabase();
});
