import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task-entity';
import { SetMetadata } from '@nestjs/common';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
