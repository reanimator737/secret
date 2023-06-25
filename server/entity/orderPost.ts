import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Comment } from './comment';
import { Category } from './category';

@Entity()
export class OrderPost {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  reward: number;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User)
  owner: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}

@Entity()
export class TemporaryPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @Index()
  secret: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  expirationTime: Date;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
