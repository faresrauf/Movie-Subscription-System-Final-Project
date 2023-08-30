/*eslint-disable*/
import { HttpException, Inject, NotFoundException, Req, ServiceUnavailableException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserAccount } from "../Models/user.entity";
import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from "../DTOs/LoginUserDTO";
import { Request } from 'express';


export class LoginService {
    constructor(
        @Inject('DATA_SOURCE') private readonly _datasource: DataSource,
        private readonly jwtService: JwtService
    ) { }

    async findUser(_username: string): Promise<UserAccount> {
        try {
            const UserRepository = await this._datasource.getRepository(UserAccount);
            if (!UserRepository) {
                throw new ServiceUnavailableException('');
            }
            const result = await UserRepository.findOne({
                where: { username: _username }
            });
            if (!result) {
                throw new NotFoundException('');
            }
            
            return result;
        } catch (err) {
        }
    }

    async validateCredentials(_username: string, _password: string): Promise<any> {
        const User = await this.findUser(_username);

        if (!User) {
            throw new NotFoundException('Username Invalid');
        }

        if (!(bcrypt.compare(_password, User.password))) {
            throw new NotFoundException('Password Invalid for this Username');
        }

        return User;
    }

    async populateRequestPayload(username: string) {
        const user = await this.findUser(username);
        if(!user) {
            
        }
        const payload = { username: user.username, id: user.userid, role: user.role };
        return payload;
    }

    async login(user: LoginUserDTO) {
        const payload = await this.populateRequestPayload(user.username);
        return {
            access_token: this.jwtService.sign(payload),
        };

    }
}