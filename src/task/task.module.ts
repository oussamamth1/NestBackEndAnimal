import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tassk-reposetory';
import { Task } from './task-entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  //     imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
