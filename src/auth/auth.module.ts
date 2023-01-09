import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../shear/users/user.entity';
// import { Box } from '../shared/boxes/box.entity';

import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
// import { BoxesService } from 'src/components/boxes/boxes.service';
import { MailerService } from '@nestjs-modules/mailer';
import { AdminStrategy } from './strategies/admin.strategy';
// import { BoxStrategy } from './strategies/box.strategy';
// import { BoxesModule } from 'src/components/boxes/boxes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
    PassportModule,
    // forwardRef(() => BoxesModule),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminStrategy,
    // BoxStrategy,
    UsersService,
    // BoxesService,
  ],
  exports: [AuthService, PassportModule /*, JwtService*/],
  controllers: [AuthController],
})
export class AuthModule {}
