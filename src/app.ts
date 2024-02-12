// app.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PORT } from './config/constants';
import sequelizer from './config/database'; 

import { examRoute } from './routes/examRoute';

const app = express();
const port: number = parseInt(PORT!) || 5000;

app.use(bodyParser.json());

// check if app works
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
});

sequelizer.sync({ force: true }).then(() => {
  console.log('Database and tables synchronized.');
});

app.use(examRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
