/*eslint-disable*/
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SubscriptionDetails } from "../Models/subscriptiondetails.entity";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { UserAccount } from "src/App Modules/Auth/Models/user.entity";

@Injectable() 
export class SubscriptionActivationService {
    constructor(
        private readonly repositoryUtil: RepositoryUtil
    ) {}
    
    async getAllPendingSubscriptions(): Promise<SubscriptionDetails[]> {
        try {
        const pendingSubs = await this.repositoryUtil.getRepository(SubscriptionDetails)
        .createQueryBuilder('s')
        .select('s.SubscriptionType', 'PlanType')
        .addSelect('u.Username', 'User')
        .addSelect('s.SubscriptionPrice', 'PaymentCharge')
        .innerJoin(UserAccount, 'u', 's.UserID = u.UserID')
        .where('s.SubscriptionStatus = :status', {status: 'PENDING'})
        .getRawMany();

        return pendingSubs as unknown as SubscriptionDetails[];
        } catch(err) {
            throw new InternalServerErrorException('Error happened while fetching pendings.');
        }
    }

    async adminActivation(subId: number) {
        await this.repositoryUtil.getRepository(SubscriptionDetails)
        .update(subId, { subscriptionstatus: 'ACTIVE'});
        //Send Email of confirmation for user.
    }
}