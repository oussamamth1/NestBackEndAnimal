import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/models/entities/user.entity';
import { SetMetadata } from '@nestjs/common';
// import { GetTaskFilterDTo } from './dto/gettask-filter.dto';
@EntityRepository(User)
export class usersRepositiry extends Repository<User> {
//   async getTasks(): Promise<User[]> {
//     const { status, search } = filterDto;
//     const querry = this.createQueryBuilder('user');
//     const task = querry.getMany();
//     if (status) {
//       querry.andWhere('task.status = :status', { status });
//     }
//     if (search) {
//       querry.andWhere(
//         'task.title LIKE :search OR task.description LIKE :search',
//         { search: `%${search}` },
//       );
//     }

//     return task;
//   }
}
