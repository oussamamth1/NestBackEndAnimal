import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/models/entities/user.entity';
export const GetUser = createParamDecorator((data, req):User => {
    return req.user;
});
export const User1 = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
