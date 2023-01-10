import { Injectable, NotFoundException, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createTaskDto } from './dto/create-taskes.dto';
import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
import { TaskRepository } from './tassk-reposetory';
import { In, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { Task } from './task-entity';
import { taskstutus } from './task-status-enum';
import { User } from 'src/users/models/entities/user.entity';
@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  //   constructor(
  //     @InjectRepository(Task)
  //     private taskReposeitory: Repository<Task>,
  //   ) {}
  constructor(
    @InjectRepository(TaskRepository) private taskReposeitory: Repository<Task>,
    private TaskReposeitory: TaskRepository,
    @Inject(REQUEST) private request: Request,
  ) {}
  async updatetaskStatus(id: number, status: taskstutus): Promise<Task> {
    const task = await this.GetTaskWithId(id);
    task.status = status;
    task.save();
    return task;
  }
  async getTasks(filterdto: GetTaskFilterDTo): Promise<Task[]> {
    return await this.TaskReposeitory.getTasks(filterdto);
  }
  findAll(filterdto: GetTaskFilterDTo): Promise<Task[]> {
    const result = this.taskReposeitory.find(filterdto);
    // const t = this.request.user;
    // // const result = this.TaskReposeitory.find({
    // //   where: { user },
    // //   relations:['user'],
    // });

    // const findwhereid = this.TaskReposeitory.createQueryBuilder('task')
    //   .where('task.userId = :userId', { userId: user.id })
    //   .getMany();
    // console.log(this.request.user, 'result');
    return result;
  }
  findAllRealation(filterdto: GetTaskFilterDTo, user: User): Promise<Task[]> {
    // const result = this.taskReposeitory.find(filterdto);
    // const t = this.request.user;
    // // const result = this.TaskReposeitory.find({
    // //   where: { user },
    // //   relations:['user'],
    // });

    const findwhereid = this.TaskReposeitory.createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id })
      .getMany();
    console.log(this.request.user, 'result');
    return findwhereid;
  }
  //   getAllTask(): Task[] {
  //     return this.task;
  //   }
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
  async delettask(id: number): Promise<void> {
    const deletid = await this.taskReposeitory.delete(id);
    if (deletid.affected === 0) {
      throw new NotFoundException(`this task "${id}" not found`);
    }
    console.log(deletid.affected);
  }
  async GetTaskWithId(id: number): Promise<Task> {
    const found = await this.taskReposeitory.findOne(id);
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
  async createTask(createTaskdto: createTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskdto;
    const task = new Task();
    task.title = title;
    task.description = description;

    task.status = taskstutus.OPEN;
    task.user = user;
    console.log(user, 'usertask');
    await task.save();

    // delete task.user;
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
