/* eslint-disable */
import { ConflictException, InternalServerErrorException, Injectable, Inject } from "@nestjs/common";
import { RegisterUserDTO } from "../DTOs/RegisterUserDTO";
import { SuccessResponseDTO } from "../DTOs/SuccessResponseDTO";
import { DataSource } from "typeorm";
import { UserAccount } from "../Models/user.entity";
import * as bcrypt from 'bcrypt';
import { UsersService } from "src/App Modules/User Accounts/users.service";
import { EmailService } from "src/Shared Modules/Email/email.service";

@Injectable()
export class RegistrationService {
    constructor(
        @Inject('DATA_SOURCE') private readonly datasource: DataSource,
        private readonly usersService: UsersService,
        private readonly emailService: EmailService
    ) { }

    async createNewUser(User: RegisterUserDTO): Promise<SuccessResponseDTO> {

            const userRepository = this.datasource.getRepository(UserAccount);

            this.usersService.checkExistingUser(User.email);

            User.password = await bcrypt.hash(User.password, 10);
            console.log(User);
            const user = await userRepository
                .create(User);

            await userRepository.save(user);

            const emailData = {
                username: user.username,
                email: user.email,
                name: user.name
            };

            await this.emailService.sendConfirmationEmail(emailData);

            return new SuccessResponseDTO(user.userid, user.email);
        
    }

}