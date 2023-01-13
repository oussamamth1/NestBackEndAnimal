import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Validate } from 'class-validator/types/decorator/decorators';
import { createTaskDto } from './dto/create-taskes.dto';
import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pip';
import { Task } from './task-entity';
import { TaskService } from './task.service';
import { GetUser, User1 } from '../auth/get-uses-decorider';
import { User } from 'src/users/models/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { taskstutus } from './task-status-enum';
import { Res } from '@nestjs/common/decorators';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(
    private taskserver: TaskService,
    private authService: AuthService,
  ) {}
  //   @Get()
  //   gettaskes(@Query(ValidationPipe) filterDto: GetTaskFilterDTo): taskin[] {
  //       if (Object.keys(filterDto).length) {
  //           return this.taskserver.getteskwithfilter(filterDto);
  //       } else

  //       { return this.taskserver.getAlltask(); }

  //   }
  //   @Get('/:id')
  //   gettaskid(@Param('id') id: string): taskin {
  //      return this.taskserver.gettaskid(id);

  // }
  @Get('/:id')
  async gettaskid(
    @Param('id', ParseIntPipe) id: number,
    @User1() user: User,
  ): Promise<Task> {
    return await this.taskserver.GetTaskWithId(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  test(@GetUser() user: User) {
    console.log(user, 'create user');
  }

  //          try {
  //       await this.userSvc.updateUser(
  //         id,
  //         firstName,
  //         lastName,
  //         gender,
  //         birthdate,
  //         country,
  //         city,
  //         address,
  //         zipCode,
  //         phoneNumber,
  //       );
  //     } catch (e) {
  //       throw new BadRequestException({
  //         description: 'User ID not found or not valid ',
  //       });
  //     }
  //     return res
  //       .status(HttpStatus.OK)
  //       .json('Updated User Information Successfuly');
  //   }

  //   @Delete('/:id')
  //   delettakid(@Param('id') id: string): void {
  //     this.taskserver.deletid(id);
  //   }
  //   @Patch('/:id/status')
  //   patchtask(@Param('id') id: string,@Body('status',TaskStatusValidation) status:taskstutus): taskin {
  //    return this.taskserver.patch(id,status);
  //   }
  //     @Post()
  //       @UsePipes(ValidationPipe )
  //   createTask(
  //     // @Body('title') title: string,
  //     // @Body('description') description: string,
  //     @Body() createTaskdto: createTaskDto,
  //   ) {
  //     return this.taskserver.createTask(createTaskdto);
  //   }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Req() req,

    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskdto: createTaskDto,
  ): Promise<Task> {
    //   const UserFound = await this.authService.decrypteUserToken(user);
    //   console.log(req, 'gggggggggggggg');

    return this.taskserver.createTask(createTaskdto, req.user);
  }
  @Delete('/:id')
  deletTask(
    @Param('id', ParseIntPipe) id: number,
    @User1() user: User,
  ): Promise<void> {
    return this.taskserver.delettask(id, user);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @User1() user: User,
    @Body('status', TaskStatusValidation) status: taskstutus,
  ): Promise<Task> {
    return this.taskserver.updatetaskStatus(id, status, user);
  }
  @Get(':name/:designation')
  getalTask(
    @Query(ValidationPipe) filterdto: GetTaskFilterDTo,
  ): Promise<Task[]> {
    return this.taskserver.getTasks(filterdto);
  }
  // @Get()
  // async getAllTaskes(@Query(ValidationPipe) filterdto: GetTaskFilterDTo) {
  //   const Taskes = await this.taskserver.findAll(filterdto);
  //   return Taskes;
  // }
  @Get(':tasks/:all')
  async getAllTaskes(
    @Query(ValidationPipe) filterdto: GetTaskFilterDTo,
    //   @GetUser() user: User,
  ) {
    const Taskes = await this.taskserver.findAll(filterdto);

    return Taskes;
  }
  @Get()
  async getAllTaskesRelation(
    @Query(ValidationPipe) filterdto: GetTaskFilterDTo,

    @User1() user: User,
  ) {
    console.log(user.id, 'userid');
    const Taskes = await this.taskserver.findAllRealation(filterdto, user);

    return Taskes;
  }
  // @Get()
  // async findOne(@User1() user: User) {
  //   console.log(user.id,'userid');
  // }
}
