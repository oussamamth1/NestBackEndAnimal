import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { User } from './models/entities/user.entity';
import { User1 } from 'src/auth/get-uses-decorider';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private taskserver: UsersService,
  ) {}

  @Post('r')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTaskesRelation(@User1() user: User) {
    console.log(user, 'userid');

    const Taskes = await this.taskserver.findUserByEmail1(user);

    return Taskes;
  }
}
