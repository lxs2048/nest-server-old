import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PwdList {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column()
  website: string;
  //普通列
  @Column()
  username: string;
  //普通列
  @Column()
  password: string;
}
