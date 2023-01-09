// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/shear/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';

import { taskstutus } from '../task/task-status-enum';
@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: taskstutus;
}
//   @Column({ name: 'creatorUserId' })
//   creatorUser: User;
//   @ManyToOne(() => User, (user) => user.id, { nullable: true })
//   @JoinColumn({ name: 'creatorUserId' })
//   creatorUserId: User;
// }
