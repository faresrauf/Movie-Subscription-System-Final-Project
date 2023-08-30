/*eslint-disable*/
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
