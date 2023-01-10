// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { NoInferType } from '@nestjs/config';
import { type } from 'os';
import { User } from 'src/users/models/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { taskstutus } from '../task/task-status-enum';
@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: taskstutus;
  //  @Column({ name: 'creatorUserId' })
  //   creatorUser: User;
  @ManyToOne((type) => User, (user) => user.taskes)
  user: User;
  //   @ManyToOne(() => User, (user) => user.id, { nullable: true })
  //   @JoinColumn({ name: 'creatorUserId' })
  //   creatorUserId: User;
  @Column()
  userId: number;
}
