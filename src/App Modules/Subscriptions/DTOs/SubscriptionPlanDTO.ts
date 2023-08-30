/*eslint-disable*/
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class SubscriptionPlanDTO {
    @IsString()
    @IsNotEmpty()
    plan: string;

    @IsNumber()
    @Min(0)
    @Max(7)
    discountPercent: number;
}