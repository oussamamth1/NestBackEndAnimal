// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { ForbiddenException, Injectable, Res } from '@nestjs/common';
// import { jwtConstants } from '../constants';
// //import { UsersService } from '../../components/users/users.service';
// // import { BoxesService } from '../../components/boxes/boxes.service';
// // import { Box } from '../../shared/boxes/box.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class BoxStrategy extends PassportStrategy(Strategy, 'box') {
//   constructor(private readonly boxesService: BoxesService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret,
//     });
//   }

//   async validate(token: string) {
//     //return true;

//     //console.log('payload', payload);
//     const box = await this.boxesService.findOneByToken(token);
//     if (box) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   //async decrypteBoxToken(@Res() res) {
//   //const token = res.req.headers.authorization.replace('Bearer ', '');
//   // const token = res.req.headers.token;
//   // const User = this.jwtService.decode(Jwt);
//   // return User;
//   //}
// }
