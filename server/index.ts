import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import orderPost from './routes/orderPost';
import comments from './routes/comment';
import userRouter from './routes/user';
import { createConnection } from 'typeorm';
import { CommentRate } from './entity/commentRate';
import { OrderPost } from './entity/orderPost';
import { User } from './entity/user';
import { Comment } from './entity/comment';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'secret_db',
  synchronize: true,
  logging: true,
  entities: [Comment, CommentRate, User, OrderPost],
});

const app: Application = express();
const port: string = process.env.PORT || '8080';

app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', orderPost);
app.use('/api', comments);

app.listen(port);

/*// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}*/
