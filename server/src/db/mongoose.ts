import env from 'dotenv';
env.config();
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_ATLAS_URL;

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL || (MONGO_URL as string))
    .then(() => {
      console.log('Connected to Mongo Atlas');
    })
    .catch((err) => {
      console.log(`There was an error connecting to Mongo Atlas: ${err}`);
    });
};

export default connectToDatabase;
