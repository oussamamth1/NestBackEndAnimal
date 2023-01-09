import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  @Min(8)
  password: string;
  @ApiPropertyOptional()
  confirmedAt: Date;
  @ApiPropertyOptional()
  confirmToken: string;
  createdAt: Date;
  role: string;
}
