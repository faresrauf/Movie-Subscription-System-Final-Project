/*eslint-disable*/
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchOptionsDTO {
    @IsString()
    @IsOptional()
    title?: any;

    @IsString()
    @IsOptional()
    yearofrelease?: string;

    @IsNumber()
    @IsOptional()
    avgrating?: number;

    @IsString()
    @IsOptional()
    director?: string;
}