/*eslint-disable*/
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginService } from 'src/App Modules/Auth/Services/login.service';

@Injectable()
export class EnrichUserInterceptor implements NestInterceptor {
  constructor(private readonly loginService: LoginService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const enrichedUser = await this.loginService.findUser(user.username);
    request.enrichedUser = enrichedUser;

    return next.handle();
  }
}


