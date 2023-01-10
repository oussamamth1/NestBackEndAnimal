import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepositiry: Repository<User>) { }

    async createUser(createUserDto:CreateUserDto): Promise<User> {
       try { const user = await this.usersRepositiry.create(createUserDto);
        await user.save();

        delete user.password;
        return user;} catch (e) {
          if (e.code == 'ER_DUP_ENTRY') {
            throw new ForbiddenException({
              description: 'Your email is already used ',
            });
           }throw new BadRequestException({
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
}
