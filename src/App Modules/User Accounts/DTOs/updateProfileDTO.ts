/* eslint-disable */

import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UpdateProfileDTO {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    billingaddress: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character',
    })
    password:string;

}