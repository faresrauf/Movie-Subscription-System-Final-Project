/*eslint-disable*/
import { Controller, Get, ParseBoolPipe, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ViewService } from "./view.service";
import { LoggedInUser } from "src/Shared Modules/Decorators/userid.decorator";
import { Response } from "express";
import { PaginationOptionsDTO } from "src/Shared Modules/DTOs/PaginationOptionsDTO";
import { SubscribedGuard } from "./subscribed.guard";

@Controller('views')
export class ViewsController {
    constructor(
        private readonly viewService: ViewService
    ) { }

    @UseGuards(SubscribedGuard)
    @Post()
    async logView(
        @LoggedInUser() userid: number,
        @Query('movie') movieid: number,
        @Res() res: Response,
    ) {
        const result = await this.viewService.logMovieView(userid, movieid);
        res.status(201).json(result);
    }

    @Get()
    //NOTE: Filter the result set of the user views upon some movie title partially.
    async getViews(
        @LoggedInUser() userid: number,
        @Query() paginationParameter: PaginationOptionsDTO,
        @Query('recent', ParseBoolPipe) mostRecent: boolean,
        @Res() res: Response,
    ) {
        const result = await this.viewService.
            getViewsOfUser(userid, paginationParameter, mostRecent);

        res.status(200).json(result);
    }
}