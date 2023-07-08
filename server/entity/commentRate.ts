import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user';
import { Comment } from './comment';

@Entity()
@Unique(['comment', 'user'])
export class CommentRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
  comment: Comment;

  @ManyToOne(() => User)
  user: User;

  @Column()
  isLiked: boolean;
}
