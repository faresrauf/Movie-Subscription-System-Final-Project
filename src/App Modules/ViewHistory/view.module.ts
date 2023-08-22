/* eslint-disable */
import { Module } from "@nestjs/common";
import { ViewService } from "./view.service";
import { ViewsController } from "./view.controller";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { SubscriptionsModule } from "../Subscriptions/subscriptions.module";
import { SubscriptionService } from "../Subscriptions/Services/subscriptions.service";

@Module({
    imports: [SubscriptionsModule],
    providers: [RepositoryUtil, ViewService, SubscriptionService],
    controllers: [ViewsController],
  })
  export class ViewModule {}
  