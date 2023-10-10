import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
dotenv.config();
//routes
import userRoutes from './routes/user.routes';
import companyRoutes from './routes/company.routes';

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSE_SECRET));

app.use('/api/auth', userRoutes);
app.use('/api/company', companyRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

//TODO: error handler
app.use(errorMiddleware);

export default app;
