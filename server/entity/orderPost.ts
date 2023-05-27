import { Column, Entity, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class OrderPost {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  reward: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User)
  owner: User;
}

@Entity()
export class TemporaryPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Index
  @Column()
  secret: string;

  @Column({ type: 'timestamptz' })
  expirationTime: Date;

  @ManyToOne(() => User)
  owner: User;
}
