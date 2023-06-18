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
  reward: number;

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

  @Column()
  @Index()
  secret: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  expirationTime: Date;

  @ManyToOne(() => User)
  owner: User;
}
