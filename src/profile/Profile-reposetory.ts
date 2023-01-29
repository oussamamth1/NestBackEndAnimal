import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './task-entity';
import { SetMetadata } from '@nestjs/common';
import { Profile } from './Profile.entity';
// import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
//   async getTasks(filterDto: GetTaskFilterDTo): Promise<Task[]> {
//     const { status, search } = filterDto;
//       const querry = this.createQueryBuilder('task');
//       const task = querry.getMany()
//       if (status) {
//           querry.andWhere('task.status = :status', { status })
//       }
//       if (search) {
//         querry.andWhere(
//           'task.title LIKE :search OR task.description LIKE :search',
//           { search:`%${search}` },
//         );
//       }


//     return task;
//     }    
    
}
