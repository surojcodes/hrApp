import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from './utils/logger';

dotenv.config();
const port = process.env.PORT || 5000;
const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    log.info('MongoDB Connected!');
  } catch (e) {
    log.error(e);
  }
  app.listen(port, () => {
    log.info(`Server listening on port ${port}`);
  });
};

startApp();
