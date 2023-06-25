import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import orderPost from './routes/orderPost';
import comments from './routes/comment';
import userRouter from './routes/user';
import { createConnection } from 'typeorm';
import { CommentRate } from './entity/commentRate';
import { OrderPost, TemporaryPost } from './entity/orderPost';
import { User } from './entity/user';
import { Comment } from './entity/comment';
import path from 'path';
import { newPostWatcherEvent } from './watchers/newPost';
import { Server } from 'socket.io';
import * as http from 'http';
import category from './routes/category';
import { Category } from './entity/category';
require('dotenv').config();

createConnection({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5433,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Comment, CommentRate, User, OrderPost, TemporaryPost, Category],
});

const app: Application = express();
const port: string = process.env.PORT || '8080';

app.use(express.json({ limit: '50mb' }));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use('/api', userRouter);
app.use('/api', orderPost);
app.use('/api', comments);
app.use('/api', category);

export const server = new http.Server(app);
export const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

io.on('connection', (socket) => {
  socket.on('subscribeToCommentRoom', (commentId: number) => {
    socket.join(`comment:${commentId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port);
newPostWatcherEvent();
/*// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}*/
