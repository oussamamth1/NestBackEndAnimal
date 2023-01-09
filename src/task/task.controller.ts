import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Validate } from 'class-validator/types/decorator/decorators';
import { createTaskDto } from './dto/create-taskes.dto';
import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pip';
import { Task } from './task-entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskserver: TaskService) {
    }
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
 async gettaskid(@Param('id', ParseIntPipe) id: number): Promise<Task> {
   return await this.taskserver.GetTaskWithId(id); }
     
      
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
      @Post()
        @UsePipes(ValidationPipe )
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskdto: createTaskDto,
      ): Promise<Task> {
          
          return this.taskserver.createTask(createTaskdto);
          
  }
}
