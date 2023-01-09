import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Task } from './task/task-entity';
// import { typeOrmConfig } from './config/configorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: null,
      database: 'task',
      entities: [Task],
      // entities: ['../typeorm/entities/*.ts'],

      synchronize: true,
    }),
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
