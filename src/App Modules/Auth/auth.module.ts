/* eslint-disable */
import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegistrationService } from "./Services/registration.service";
import { DatabaseModule } from "src/Shared Modules/Database/database.module";
import { LoginService } from "./Services/login.service";
import { LocalStrategy } from "src/Shared Modules/Passport/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";
import { JwtStrategy } from "src/Shared Modules/Passport/jwt.strategy";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UsersService } from "../User Accounts/users.service";
import { EmailService } from "src/Shared Modules/Email/email.service";
import { EnrichUserInterceptor } from "src/Shared Modules/Interceptors/RequestEnrichInterceptor";
config();

@Module({
    imports: [DatabaseModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '3600s'
      }
    })],
    providers: [RegistrationService, LoginService, UsersService, EmailService,
    LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [LoginService]
  })
  export class AuthModule {}
  