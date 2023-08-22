/* eslint-disable */
import { Module } from "@nestjs/common";
import { ValidationPipe } from "./Pipes/validation.pipe";
import { AuthModule } from "src/App Modules/Auth/auth.module";

@Module({
    imports: [AuthModule],
    exports: [ValidationPipe],
    providers: [],
    controllers: [],
  })
  export class SharedModule {}
  