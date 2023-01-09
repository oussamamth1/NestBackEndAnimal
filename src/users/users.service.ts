import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../shear/users/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User) {
    return this.usersRepository.save(user);
    //console.log("d:", d);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneBy({
      email: email,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOneById(id: number, ParseInt): Promise<User> {
      return await this.usersRepository.findOneBy({ id:id });
}

async updateUser(userId:string , firstName:string , lastName:string , gender:string ,birthDate:string , country:string , city:string ,address:string ,zipCode:string , phone:string){
    const updatedProfile = await this.findOne(userId);
    
    if (firstName) {
        updatedProfile.firstName = firstName;
    }
    if (lastName) {
        updatedProfile.lastName = lastName;
    }
    if (gender) {
        updatedProfile.gender = gender;
    }
    if (birthDate) {
        updatedProfile.birthDate = new Date(birthDate);
    }
    if (phone) {
        updatedProfile.phone = phone;
    }
    updatedProfile.modifiedAt = new Date();
    this.usersRepository.save(updatedProfile);
}


}
