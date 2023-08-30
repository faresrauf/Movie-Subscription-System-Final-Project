/* eslint-disable */

import { Body, Controller, Delete, Param, Patch, Put, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Role } from "src/App Modules/Subscriptions/Enums/roles.enum";
import { Roles } from "src/Shared Modules/Decorators/role.decorator";
import { Response } from 'express'
import { UpdateProfileDTO } from "./DTOs/updateProfileDTO";
import { LoggedInUser } from "src/Shared Modules/Decorators/userid.decorator";

@Controller('users')
export class UsersController {
    constructor(
    private readonly usersService: UsersService
    ) {}

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        const message = await this.usersService.deleteUserById({id: parseInt(id)});
        res.status(200).json(message);
    }

    @Put()
    async updateUser(
         @Body() updateProfileDTO: UpdateProfileDTO,
         @LoggedInUser() userid: number,
         @Res() res: Response) {
        await this.usersService.updateProfile(updateProfileDTO, userid);
        res.status(200).json('User updated succcesfully');
    }

}