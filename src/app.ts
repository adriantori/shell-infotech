// app.ts

import express, { Request, Response } from 'express';

import { PORT } from './config/constants';
import globalMiddleware from './middlewares'

import { examRoute } from './routes/examRoute';

const app = express();
const port: number = parseInt(PORT!) || 5000;

globalMiddleware(app);

// check if app works
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
});

app.use(examRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;