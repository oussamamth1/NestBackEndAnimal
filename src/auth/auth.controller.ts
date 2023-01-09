import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Res,
  HttpStatus,
  Inject,
  /*ValidationPipe,*/
  Get,
  Param,
  Render,
  ForbiddenException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
//import { user } from '../user/interface/user.interface';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { ResetPasswordDto } from '../users/dto/resetPassword.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { get } from 'http';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  //@Inject('MailerProvider') private readonly mailerProvider;

  constructor(
    private authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body, @Request() req) {
    console.log(body, req, 'work');

    // const $res = this.authService.login(body);
    return this.authService.login(body);
    /*return status(HttpStatus.OK).json({
      //this.authService.login(body);
      $res,
    });*/
  }

  @Post('register')
  async register(
    @Res() res,
    @Body(/*ValidationPipe*/) CreateUserDTO: CreateUserDTO,
  ) {
    try {
      const addedUser = await this.authService.createUser(CreateUserDTO);
      this.SendMail(addedUser['confirmToken']);
      return res.status(HttpStatus.OK).json({
        description: 'User has been successfully added!',
        user: addedUser,
      });
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ForbiddenException({
          description: 'Your email is already used ',
        });
      }
      throw new BadRequestException({
        description: 'Error',
        error: e,
      });
    }
  }

  @Post('forgotPassword')
  async forgotPassword(
    @Res() res,
    @Body(/*ValidationPipe*/) resetPasswordDto: ResetPasswordDto,
  ) {
    const addedUser = await this.authService.resetPassword(resetPasswordDto);
    this.SendMail(addedUser['confirmToken']);
    return res.status(HttpStatus.OK).json({
      description: 'email send',
      user: addedUser,
    });
  }

  async SendMail(confirmToken: string) {
    return await this.mailerService
      .sendMail({
        from: 'continuesNet.Com',
        to: this.authService.emailUser,
        subject: 'Confirm your  Account ✔',
        template: 'index', // HBS Call
        html:
          '<h1>Confirm your  Account ✔</h1><h3>Welcome</h3><h4>Thanks for signing up ! Please confirm your account.</h4><a href="localhost:3000/verification/emailToken=' +
          confirmToken +
          '" target="_blank">Confirm Account</a> <p>— The CONTINUOUSNET Team</p>',
      })
      .then((success) => {
        console.log('success', success);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
