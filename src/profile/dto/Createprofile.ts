import { IsNotEmpty } from 'class-validator';
import { Double } from 'typeorm';
import { Profile } from '../Profile.entity';
// import { ProfileData, ProfileRO } from '../profile.interface';
export class CreateProfileDto extends Profile {
  //   profile: ProfileData;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  bio: string;
  @IsNotEmpty()
  about: string;
  @IsNotEmpty()
  titleline: string;
  @IsNotEmpty()
  DOB: string;
  @IsNotEmpty()
  profession: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  img: string;
  @IsNotEmpty()
  __v: string;
}
