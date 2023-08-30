/* eslint-disable */
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserAccount } from "../Auth/Models/user.entity";
import { UpdateProfileDTO } from "./DTOs/updateProfileDTO";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DATA_SOURCE') private readonly datasource: DataSource
    ) { }

    //NOTE: I will make this generic later and extract it as a utility
    getRepository() {
        return this.datasource.getRepository(UserAccount);
    }

    async updateProfile(updateProfileDTO: UpdateProfileDTO, id: number) {
        const user = await this.getRepository().findOne({ where: { userid: id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (updateProfileDTO.username) {
            user.username = updateProfileDTO.username;
        }

        if (updateProfileDTO.email) {
            user.email = updateProfileDTO.email;
        }

        if (updateProfileDTO.billingaddress) {
            user.billingaddress = updateProfileDTO.billingaddress;
        }

        if (updateProfileDTO.password) {
            user.password = await bcrypt.hash(updateProfileDTO.password, 10);
        }

        try{
        return this.getRepository().save(user);

        } catch(err) {
            if(err instanceof NotFoundException)
                throw new NotFoundException('User not found');
            throw new InternalServerErrorException('Error happened while updating the profile');
        }
    }

    async deleteUserById({ id }: { id: number; }) {
        try {
            await this.searchUserById(id);

            await this.getRepository().delete(id);

            return {
                message: `User with id ${id} deleted succesfully`
            }
        } catch (err) {
            if (err instanceof NotFoundException)
                throw new NotFoundException(`User with ID ${id} not found`);
            throw new InternalServerErrorException('Error happened while deleting user!');
        }
    }

    async searchUserById(id: number) {
        const user = await this.getRepository()
            .findOne(
                {
                    where: { userid: id }
                }
            );

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async checkExistingUser(email: string) {
        const exsistingUser = await this.getRepository()
            .findOne(
                {
                    select: ['userid'],
                    where: { email: email }
                }
            );

        if (exsistingUser) {
            throw new ConflictException('This email is already taken');
        }

        return;
    }
}