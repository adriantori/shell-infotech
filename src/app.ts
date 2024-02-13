// app.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PORT } from './config/constants';

import { examRoute } from './routes/examRoute';

const app = express();
const port: number = parseInt(PORT!) || 5000;

app.use(bodyParser.json());

// check if app works
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
});

app.use(examRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});