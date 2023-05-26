import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  address: string;

  @Column()
  rate: number;

  @Column({ nullable: true })
  nickName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;
}
