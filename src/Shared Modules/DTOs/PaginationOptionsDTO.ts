/*eslint-disable*/
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PaginationOptionsDTO {
    @IsNumber()
    items?: number;

    @IsNumber()
    page?: number;
}