/*eslint-disable*/
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from 'src/App Modules/Auth/Services/login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.loginService.validateCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials, please try again');
    }
    return user;
  }
}