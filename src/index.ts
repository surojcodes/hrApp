import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 5000;
const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected!');
  } catch (e) {
    console.log(e);
  }
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startApp();
