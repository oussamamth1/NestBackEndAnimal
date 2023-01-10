import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './models/dto/user-login.dto';
import { User } from 'src/users/models/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: UserLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      id: user.id,
      username: user.email,
      password: user.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async validateUser(userLoginDto: UserLoginDto): Promise<User> {
  //     const { email, password } = userLoginDto;

  //     const user = await this.usersService.findUserByEmail(email);
  //      const compare = await bcrypt.compare(password, user.password);
  //     if (!(await user.validatePassword(password))) {
  //         throw new UnauthorizedException();
  //     }
  //     return user;
  // }
  async validateUser(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    const user = await this.usersService.findUserByEmail(email);
    console.log('user', user);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
//   async decrypteUserToken(@Res() res) {
//     const Jwt = res.req.headers.authorization.replace('Bearer ', '');
//     // const User = this.jwtService.decode(res);
//       console.log(Jwt)
//     return User;
//   }
}
