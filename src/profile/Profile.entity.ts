// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { NoInferType } from '@nestjs/config';
import { type } from 'os';
import { User } from 'src/users/models/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { taskstutus } from '../task/task-status-enum';
@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  DOB: string;
  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  about: string;
  @Column({ nullable: true })
  titleline: string;
  @Column({ nullable: true })
  img:  string= "";
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
 __v: string;
  
  //   @Column()
  //   status: taskstutus;
  //  @Column({ name: 'creatorUserId' })
  //   creatorUser: User;
  @ManyToOne((type) => User, { cascade: false })
  user: User;
  //   @ManyToOne(() => User, (user) => user.id)
  //   @JoinColumn({ name: 'creatorUserId' })
  //   creatorUserId: User;
  @Column()
  userId: number;
}
