import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import * as http from 'http';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/comment';

export class Websocket {
  readonly POST_GET_ALL_DATA = 'POST_GET_ALL_DATA';
  readonly SUBSCRIBE_TO_COMMENT_ROOM = 'SUBSCRIBE_TO_COMMENT_ROOM';
  readonly ROOM_POST = 'post:';
  readonly NEW_COMMENT = 'NEW_COMMENT';
  readonly NEW_REACTION = 'NEW_REACTION';

  private io: Server<DefaultEventsMap, DefaultEventsMap>;
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
    this.io = new Server(server, {
      cors: {
        origin: true,
        credentials: true,
      },
      allowEIO3: true,
    });

    this.connection();
  }

  private connection() {
    this.io.on('connection', (socket) => {
      this.socket = socket;
      this.subscribeToCommentRoom();
      this.disconnect();
    });
  }

  private subscribeToCommentRoom() {
    this.socket.on(this.SUBSCRIBE_TO_COMMENT_ROOM, async (postId: number) => {
      this.socket.join(this.commentRoomByPostId(postId));
      const commentRepository = getRepository(Comment);
      const comments = await commentRepository.find({
        where: { post: { id: postId } },
        relations: ['owner', 'commentRates'],
      });
      this.socket.emit(this.POST_GET_ALL_DATA, comments);
    });
  }

  private disconnect() {
    this.socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }

  private commentRoomByPostId(postId: number) {
    return `${this.ROOM_POST}${postId}`;
  }

  public emitNewComment({ newComment, postId }: { newComment: Comment; postId: number }): void {
    this.io.to(this.commentRoomByPostId(postId)).emit(this.NEW_COMMENT, newComment);
  }

  public emitReaction(comment: Comment): void {
    this.io.to(this.commentRoomByPostId(comment.post.id)).emit(this.NEW_REACTION, comment);
  }
}
