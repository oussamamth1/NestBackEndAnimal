import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User1 } from 'src/auth/get-uses-decorider';
import { GetTaskFilterDTo } from 'src/task/dto/gettask-filter.dto';
import User from 'src/users/models/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/Createprofile';
import { Profile } from './Profile.entity';
import { ProfileRO } from './profile.interface';
import { ProfileService } from './profile.service';
@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  logger: any;
  constructor(
    private profileService: ProfileService, // @InjectRepository(Profile) // private readonly userRepository: Repository<Profile>,
  ) {}
  @Get('/:id')
  async gettaskid(@Param('id', ParseIntPipe) ID: number, @User1() user: User) {
    return await this.profileService.GetProfileWithId(ID, user);
  }
  @Get('')
  async getProfileRelation(
    // @Query(ValidationPipe) filterdto: GetTaskFilterDTo,
    @Res() res,
    @User1() user: User,
  ) {
    console.log(user.id, 'userid');
    // this.logger.verbose(
    //   `User "${user.id}" recive all tasks filters:}`,
    // );
    const Profile = await await this.profileService.findAllRealation(user);
    //   return res.status(HttpStatus.OK).toJSON(Profile);
    // return Profile;
    return res.json({ data: Profile });
  }

  //   @Get(':username')
  //   async getProfile(
  //     @User1('id') userId: number,
  //     @Param('username') username: string,
  //   ): Promise<ProfileRO> {
  //     return await this.profileService.findProfile(userId, username);
  //   }
  @Post()
  //   @UsePipes(ValidationPipe)
  async createProfile(
    @Req() req,

    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskdto: CreateProfileDto,
  ) {
    //   const UserFound = await this.authService.decrypteUserToken(user);
    //   console.log(req, 'gggggggggggggg');

    return this.profileService.Creatprofil(createTaskdto, req.user);
  }
  //   @Post(':username/follow')
  //   async follow(
  //     @User1('email') email: string,
  //     @Param('username') username: string,
  //   ): Promise<ProfileRO> {
  //     return await this.profileService.follow(email, username);
  //   }

  //   @Delete(':username/follow')
  //   async unFollow(
  //     @User1() user: User,
  //     @Param('username') username: string,
  //   ): Promise<ProfileRO> {
  //     return await this.profileService.unFollow(user, username);
  //   }
}
