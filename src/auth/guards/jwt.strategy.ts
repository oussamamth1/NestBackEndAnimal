import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: number; email: string; password: string ,username:string}) {
    return {
      id: payload.id,
      email: payload.email,
        password: payload.password,
      username:payload.username
    };
  }
}