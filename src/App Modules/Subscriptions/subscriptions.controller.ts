/*eslint-disable*/
import { Body, Controller, Get, ParseIntPipe, Post, Put, Query, Res } from "@nestjs/common";
import { SubscriptionService } from "./Services/subscriptions.service";
import { SubscriptionActivationService } from "./Services/subscriptionactivation.service";
import { LoggedInUser } from "src/Shared Modules/Decorators/userid.decorator";
import { Response } from "express";
import { SubscriptionPlanDTO } from "./DTOs/SubscriptionPlanDTO";
import { Role } from "src/App Modules/Subscriptions/Enums/roles.enum";
import { Roles } from "src/Shared Modules/Decorators/role.decorator";

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(
        private readonly subscriptionsService: SubscriptionService,
        private readonly subscriptionActivationService: SubscriptionActivationService
    ) { }

    @Get()
    async getSubscriptions(
        @LoggedInUser() userid: number,
        @Res() res: Response
    ) {
        const result = await this.subscriptionsService.getSubscriptionsOfUser(userid);
        res.status(200).json(result);
    }

    @Post()
    async addNewwPlan(
        @LoggedInUser() userid: number,
        @Res() res: Response,
        @Body() subscriptionPlanDTO: SubscriptionPlanDTO
    ) {
        const response = await this.subscriptionsService.addNewPlan(userid, subscriptionPlanDTO);
        res.status(201).json(response);
    }

    @Get('pending')
    @Roles(Role.Admin)
    async getPending(@Res() res: Response) {
        const result = await this.subscriptionActivationService.getAllPendingSubscriptions();
        res.status(200).json(result);
    }

    @Put('activation')
    @Roles(Role.Admin)
    async activateSupscriptionPlan(
        @Query('id', ParseIntPipe) subID: number,
        @Res() res: Response
    ){
        await this.subscriptionActivationService.adminActivation(subID);
        res.status(200).json('Users subscription plan has been activated succesfully');
    }
    
}