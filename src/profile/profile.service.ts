import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDTo } from 'src/task/dto/gettask-filter.dto';
import { User } from 'src/users/models/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/Createprofile';
import { ProfileRepository } from './Profile-reposetory';
import { Profile } from './Profile.entity';
import { ProfileData, ProfileRO } from './profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private Profilerep: Repository<Profile>, // @InjectRepository(Profile) // private userRepository: Repository<Profile>, // @InjectRepository(FollowsEntity) // private readonly followsRepository: Repository<FollowsEntity>,
  ) {}

  async findAll(): Promise<Profile[]> {
    return await this.Profilerep.find();
  }
  async Creatprofil(
    createTaskdto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const { email, bio, titleline, DOB, about, name, profession, img, __v } =
      createTaskdto;
    const profile = new Profile();
    profile.email = email;
    profile.titleline = titleline;
    profile.DOB = DOB;
    profile.name = name;
    profile.about = about;
      profile.profession = profession;
      profile.img = img;
      profile.__v = __v;
      
      

    // task.status = taskstutus.OPEN;
    profile.user = user;
    // console.log(user, 'userprofil');
    await profile.save();

    // delete task.user;
      return profile ;
  }
  //   async findOne(options?: DeepPartial<User>): Promise<Profile> {
  //     const user = await this.userRepository.findOne(options);
  //     delete user.id;
  //     if (user) delete user.password;
  //     return { profile: user };
  //   }

  //   async findProfile(id: number, followingUsername: string): Promise<ProfileRO> {
  //     const _profile = await this.userRepository.findOne({
  //       username: followingUsername,
  //     });

  // if (!_profile) return;

  // let profile: ProfileData = {
  //   username: _profile.username,
  //   bio: _profile.bio,
  //   image: _profile.image,
  // };

  // const follows = await this.followsRepository.findOne({
  //   followerId: id,
  //   followingId: _profile.id,
  // });

  // if (id) {
  //   profile.following = !!follows;
  // }

  // return { profile };
  //   }

  //   async follow(followerEmail: string, username: string): Promise<ProfileRO> {
  //     if (!followerEmail || !username) {
  //       throw new HttpException(
  //         'Follower email and username not provided.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  // const followingUser = await this.userRepository.findOne({ username });
  // const followerUser = await this.userRepository.findOne({
  //   email: followerEmail,
  // });

  // if (followingUser.email === followerEmail) {
  //   throw new HttpException(
  //     'FollowerEmail and FollowingId cannot be equal.',
  //     HttpStatus.BAD_REQUEST,
  //   );
  // }

  // const _follows = await this.followsRepository.findOne({
  //   followerId: followerUser.id,
  //   followingId: followingUser.id,
  // });

  // if (!_follows) {
  //   const follows = new FollowsEntity();
  //   follows.followerId = followerUser.id;
  //   follows.followingId = followingUser.id;
  //   await this.followsRepository.save(follows);
  // }

  //     let profile: ProfileData = {
  //       username: followingUser.username,
  //       bio: followingUser.bio,
  //       image: followingUser.image,
  //       //   following: true,
  //     };

  //     return { profile };
  //   }

  //   async unFollow(followerId: number, username: string): Promise<ProfileRO> {
  //     if (!followerId || !username) {
  //       throw new HttpException(
  //         'FollowerId and username not provided.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     const followingUser = await this.userRepository.findOne({ username });

  //     if (followingUser.id === followerId) {
  //       throw new HttpException(
  //         'FollowerId and FollowingId cannot be equal.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     // const followingId = followingUser.id;
  //     // await this.followsRepository.delete({ followerId, followingId });

  //     let profile: ProfileData = {
  //       username: followingUser.username,
  //       bio: followingUser.bio,
  //       image: followingUser.image,
  //       following: false,
  //     };

  //     return { profile };
  //   }
  async GetProfileWithId(id: number, user: User): Promise<Profile> {
    const found = await this.Profilerep.findOne({
      where: { id, userId: user.id },
    });

    //   where: { id: id },
    //         }
    //     );

    if (!found) {
      throw new NotFoundException('this id of task not found');
    }
    return found;
  }
  findAllRealation(user: User) {
    // const result = this.taskReposeitory.find(filterdto);
    // const t = this.request.user;
    // // const result = this.TaskReposeitory.find({
    // //   where: { user },
    // //   relations:['user'],
    // });

    const findwhereid = this.Profilerep.createQueryBuilder('profile')
      .where('profile.userId = :userId', { userId: user.id })
      .getOne();
    // console.log(this.request.user, 'result');
    return findwhereid;
  }
}
