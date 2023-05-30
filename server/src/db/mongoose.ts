import env from 'dotenv';
env.config();
import mongoose from 'mongoose';

// Temporary URL for connection until I get it fixed
const MONGO_URL = 'mongodb+srv://ordan:ordan@dish-discovery.ow4nvan.mongodb.net/?retryWrites=true&w=majority'

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL || MONGO_URL as string)
    .then(() => {
      console.log('Connected to Mongo Atlas');
    })
    .catch((err) => {
      console.log(`There was an error connecting to Mongo Atlas: ${err}`);
    });
};

export default connectToDatabase;
