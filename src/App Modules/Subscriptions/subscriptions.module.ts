/* eslint-disable */
import { Module } from "@nestjs/common";
import { SubscriptionService } from "./Services/subscriptions.service";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { SubscriptionsController } from "./subscriptions.controller";
import { SubscriptionActivationService } from "./Services/subscriptionactivation.service";


@Module({
    providers: [SubscriptionService, RepositoryUtil, SubscriptionActivationService],
    controllers: [SubscriptionsController],
  })
  export class SubscriptionsModule {}
  