/*eslint-disable*/
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const LoggedInUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.userid;
  },
);
