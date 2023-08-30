/*eslint-disable*/
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionService } from 'src/App Modules/Subscriptions/Services/subscriptions.service';

@Injectable()
export class SubscribedGuard implements CanActivate {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userid = request.userid;

        const userSubscribed = await this.subscriptionService.checkExistingPlan(userid);

        if(!userSubscribed) {
            throw new UnauthorizedException('You need to have an active subscription');
        }

        return true;
    }
}