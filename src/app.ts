import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Node-TS server!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('Page Not Found');
});

//TODO: error handler
export default app;
