import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column()
  title: string;
}
