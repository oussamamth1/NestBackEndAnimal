import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Task } from './task/task-entity';
import { TaskModule } from './task/task.module';
import { User } from './users/models/entities/user.entity';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/Profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      dropSchema: false,
      //   entities: [__dirname +'dist/**/*.entity.ts'],
      synchronize: true,

      //   migrationsRun: true,
      //   type: 'mysql',
      //   host: 'localhost',
      //   username: 'root',
      //   password: null,
      //   database: 'aa',
      entities: [Task, User, Profile],
      //   dropSchema: true, //this option maybe helpfu
      // entities: ['../typeorm/entities/*.ts'],

      //   synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TaskModule,
    ProfileModule,
  ],
  //   controllers: [ProfileController],
  //   providers: [ProfileService],
})
export class AppModule {}
