import { BadRequestException, ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/create-user.dto';
// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UsersService {
  request: any;
  constructor(
    @InjectRepository(User) private usersRepositiry: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepositiry.create(createUserDto);
      await user.save();

      delete user.password;
      return user;
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ForbiddenException({
          description: 'Your email is already used ',
        });
      }
      throw new BadRequestException({
        description: 'Error',
        error: e,
      });
    }
  }

  async findUserByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async findUserByEmailtoken(user: User) {
    console.log(user.email);
    return await User.findOne({
      where: {
        email: user.email,
      },
    });
  }
  findAllRealation(user: User): Promise<User[]> {
    // const result = this.taskReposeitory.find(filterdto);
    // const t = this.request.user;
    // // const result = this.TaskReposeitory.find({
    // //   where: { user },
    // //   relations:['user'],
    // });

    const findwhereid = this.usersRepositiry
      .createQueryBuilder('users')
      .where('users.email = :email', { email: user.email })
      .getRawOne();
    console.log(this.request.user, 'result');
    return findwhereid;
  }
}
