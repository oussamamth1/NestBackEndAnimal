import {
  Controller,
  Body,
  Res,
  Post,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Patch,
  Query,
  UseGuards,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../shear/users/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private userSvc: UsersService,
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Edit user' })
  async update(
    @Res() res,
    @Param('id') id,
    @Query() params,
    @Body() body: CreateUserDTO,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('gender') gender: string,
    @Body('birthdate') birthdate: string,
    @Body('country') country: string,
    @Body('city') city: string,
    @Body('address') address: string,
    @Body('zipCode') zipCode: string,
    @Body('phoneNumber') phoneNumber: string,
  ) {
    try {
      await this.userSvc.updateUser(
        id,
        firstName,
        lastName,
        gender,
        birthdate,
        country,
        city,
        address,
        zipCode,
        phoneNumber,
      );
    } catch (e) {
      throw new BadRequestException({
        description: 'User ID not found or not valid ',
      });
    }
    return res
      .status(HttpStatus.OK)
      .json('Updated User Information Successfuly');
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(
    @Res() res,
    @Body('oldPassword') oldPassword,
    @Body('newPassword') newPassword,
  ) {
    let UserFound;
    try {
      UserFound = await this.authService.decrypteUserToken(res);
    } catch (e) {
      throw new BadRequestException({ description: 'Error ', error: e });
    }
    const UserInfo = await this.userSvc.findOne(UserFound.sub);
    UserInfo.password = await this.authService.hashPassword(newPassword);
    this.usersRepository.save(UserInfo);
    return res
      .status(HttpStatus.OK)
      .json({ description: 'User Password Changed Successfuly' });
  }

  /* @UseGuards(AuthGuard('admin'))
  @Get('change-password')
  async countNbFamilyInscription() {
    try {
      UserFound = await this.authService.decrypteUserToken(res);
    } catch (e) {
      throw new BadRequestException({ description: 'Error ', error: e });
    }
    const UserInfo = await this.userSvc.findOneById(UserFound.sub);
    UserInfo.password = await this.authService.hashPassword(newPassword);
    this.usersRepository.save(UserInfo);
    return res
      .status(HttpStatus.OK)
      .json({ description: 'User Password Changed Successfuly' });
  }*/
}
