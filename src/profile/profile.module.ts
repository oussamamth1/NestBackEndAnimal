import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profile } from 'console';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/models/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ProfileRepository } from './Profile-reposetory';
import { ProfileController } from './profile.controller';
import { Profile } from './Profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileRepository])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
