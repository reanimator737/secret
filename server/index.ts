// MODULES
import express, { Application } from 'express';
import 'reflect-metadata';
import path from 'path';
import cors from 'cors';
import personRouter from './routes/user';
import orderPost from './routes/orderPost';
import { AppDataSource } from './db';
import comments from './routes/comment';

// APPLICATION CONFIG
const app: Application = express();
const port: string = process.env.PORT || '8080';

// MIDDLEWARE

app.use(express.json());
app.use(cors());
app.use('/api', personRouter);
app.use('/api', orderPost);
app.use('/api', comments);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

AppDataSource.initialize()
  .then(() => app.listen(port, () => console.log('connect to ', port)))
  .catch((error) => console.log(error));
