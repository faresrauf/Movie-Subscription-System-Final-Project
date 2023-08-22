/*eslint-disable*/
import { Body, Controller, Res, HttpStatus, Get, Post, UseGuards, Inject, UseInterceptors, Req} from '@nestjs/common';
import { RegistrationService } from './Services/registration.service';
import { RegisterUserDTO } from './DTOs/RegisterUserDTO';
import { Request,Response } from 'express';
import { LoginService } from './Services/login.service';
import { Public } from 'src/Shared Modules/Decorators/public.decorator';
import { LoginUserDTO } from './DTOs/LoginUserDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly loginService: LoginService
  ) {}

  @Public()
  @Post('register')
  async registerUser(@Body() registerUserDTO: RegisterUserDTO, @Res() res: Response) {
    const createdUserResponse  = await this.registrationService.createNewUser(registerUserDTO);
    res.status(HttpStatus.CREATED).json({
        state: 'Success',
        message: `Your New Account with ID: ${createdUserResponse .userID} was created, check the verify 
        email sent at ${createdUserResponse .userEmail} and login to your account.`
    });
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.loginService.login(loginUserDTO);
  }

}
