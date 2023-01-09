import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createTaskDto } from './dto/create-taskes.dto';
import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
import { TaskRepository } from './tassk-reposetory';
import { In, Repository } from 'typeorm';
import { Task } from './task-entity';
import { taskstutus } from './task-status-enum';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskReposeitory: Repository<Task>,
  ) {}
  //   private taskin: taskin[] = [];
  //   getAlltask(): taskin[] {
  //     return this.taskin;
  //   }
  //   getteskwithfilter(taskfilter: GetTaskFilterDTo): taskin[] {
  //     const { status, search } = taskfilter;
  //     let tasks = this.getAlltask();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }
  async GetTaskWithId(id: number): Promise<Task> {
    

    const found = await this.taskReposeitory.findOneBy({
   id:id
    });
    //         {
    //   where: { id: id },
    //         }
    //     );

    if (!found) {
      throw new NotFoundException('this id of task not found');
    }
    return found;
  }

  //   gettaskid(id: string): taskin {
  //    const found =this.taskin.find((taskid) => taskid.id === id);

  //       if (!found) {
  //         throw new NotFoundException("this id of task not found");
  //       }
  //       return found;
  //   }
  //     deletid(id: string): void {
  //         const found = this.gettaskid(id);
  //         this.taskin = this.taskin.filter((taskid) => taskid.id !== found.id);

  //   }
  //   patch(id: string, tasS: taskstutus) {
  //     const task = this.gettaskid(id);
  //     task.status = tasS;
  //     return task;
  //   }
  async createTask(createTaskdto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = new Task();
    task.title = title;
    task.description = description;

    task.status = taskstutus.OPEN;
    await task.save();

    return task;
  }
  //   createTask(createTaskdto: createTaskDto) {
  //     const { title, description } = createTaskdto;
  //     const Taski: taskin = {
  //       id: uuidv4(),
  //       title,
  //       description,
  //       status: taskstutus.OPEN,
  //     };
  //     this.taskin.push(Taski);
  //     return Taski;
  //   }
}
