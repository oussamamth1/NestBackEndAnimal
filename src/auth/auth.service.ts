import { UsersService } from '../users/users.service';

import {
  Injectable,
  UnauthorizedException,
  Res,
  Inject,
  BadRequestException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/create-user.dto';
//import { InjectModel } from '@nestjs/mongoose';
//import { user } from '../user/interface/user.interface';
import { User } from '../shear/users/user.entity';
//import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordDto } from 'src/users/dto/resetPassword.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class AuthService {
  SALT_ROUNDS = 10;
  emailUser;
  tempEmailToken;

  constructor(
    //@Inject('USERS_REPOSITORY')
    //private userRepository: Repository<User>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('user', user);
    if (user) {
      const compare = await bcrypt.compare(pass, user.password);
      if (compare) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(body: any) {
    const user = await this.validateUser(body.email, body.password);
    if (user == null || user == undefined) {
      throw new UnauthorizedException({
        description: 'Votre email ou mot de passe sont incorrect',
      });
    }
    const payload = { email: user.email, id: user.id };
    if (user.confirmedAt != null) {
      return {
        token: this.jwtService.sign(payload),
        user: user,
      };
    } else
      throw new ForbiddenException({
        description: 'Vous devez Confirmer Votre Account First',
      });
  }

  async hashPassword(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async createUser(newUser: CreateUserDTO) {
    newUser.password = await this.hashPassword(newUser.password);
    newUser.confirmedAt = null;
    const payload = { email: newUser.email };
    newUser.confirmToken = this.jwtService.sign(payload);
    this.emailUser = newUser.email;
    this.tempEmailToken = newUser.confirmToken;
    newUser.createdAt = new Date();
    newUser.role = 'simpleUser';
    const createdUser = this.userRepository.save(newUser);
    return createdUser;
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    const user = await this.usersService.findOne(resetPassword.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const clientAppUrl = 'http://127.0.0.1:3000';
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    const forgotLink = `${clientAppUrl}/auth/forgotPassword?token=${access_token}`;

    await this.mailerService.sendMail({
      from: 'continuesNet.Com',
      to: user.email,
      subject: 'Confirm your  Account ✔',
      template: 'index', // HBS Call
      html: `<h3>Hello ${user.firstName}</h3>
          <p> please use this <a href="${forgotLink}">link</a> to reset your password.</p>`,
    });
  }

  async getAuthUser(@Req() req) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const payload: any = this.jwtService.decode(jwtFromRequest, {});
    if (!payload) {
      return null;
    }
    return await this.usersService.findOne(payload.email);
  }
  /*async getAuthUserByToken(@Res() res,@Req() req) {
    const token = res.req.headers.token;
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const payload: any = this.jwtService.decode(jwtFromRequest, {});
    if (!payload) {
      return null;
    }
    return await this.usersService.findOne(payload.email);
  }*/
  async decrypteUserToken(@Res() res) {
    const Jwt = res.req.headers.authorization.replace('Bearer ', '');
    const User = this.jwtService.decode(Jwt);
    return User;
  }
}
