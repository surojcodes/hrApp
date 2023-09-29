import express, { Request, Response } from 'express';
import { errorMiddleware } from './middleware/errorMiddleware';

//routes
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

//TODO: error handler
app.use(errorMiddleware);

export default app;
