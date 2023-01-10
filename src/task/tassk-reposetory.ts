import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task-entity';
import { SetMetadata } from '@nestjs/common';
import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDTo): Promise<Task[]> {
    const { status, search } = filterDto;
      const querry = this.createQueryBuilder('task');
      const task = querry.getMany()
      if (status) {
          querry.andWhere('task.status = :status', { status })
      }
      if (search) {
        querry.andWhere(
          'task.title LIKE :search OR task.description LIKE :search',
          { search:`%${search}` },
        );
      }


    return task;
    }
    
}
