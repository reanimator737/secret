import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderPost } from './orderPost';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  owner: string;

  @Column()
  text: string;

  @Column()
  hasOwnerLike: boolean;

  @ManyToOne(() => OrderPost)
  post: OrderPost;
}
