import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // console.log(payloa)
    const user = await this.usersService.findOne(payload.email);
    if (user) {
      if (user.roles === 'admin') {
        return true;
      } else {
        throw new ForbiddenException({
          description: 'Vous n`etes pas autorise a acceder a ce service',
        });
      }
    } else {
      return false;
    }
  }
}
