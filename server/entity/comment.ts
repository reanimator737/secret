import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderPost } from './orderPost';
import { CommentRate } from './commentRate';
import { User } from './user';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  owner: User;

  @Column()
  text: string;

  @Column()
  hasOwnerLike: boolean;

  @ManyToOne(() => OrderPost, { onDelete: 'CASCADE' })
  post: OrderPost;

  @OneToMany(() => CommentRate, (commentRate) => commentRate.comment)
  commentRates: CommentRate[];
}
