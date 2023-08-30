/*eslint-disable*/

import { Body, Controller, Get, Param, ParseIntPipe, Query, Res } from "@nestjs/common";
import { MovieSearchService } from "./Services/moviesearch.service";
import { SearchOptionsDTO } from "./DTOs/SearchOptionsDTO";
import { Response } from "express";
import { PaginationOptionsDTO } from "../../Shared Modules/DTOs/PaginationOptionsDTO";
import { LoggedInUser } from "src/Shared Modules/Decorators/userid.decorator";
import { StringValidationPipe } from "src/Shared Modules/Pipes/string.pipe";

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly searchEngine: MovieSearchService
    ) {}

    @Get()
    async searchMoviesBy(
        @Body() searchFilter: SearchOptionsDTO,
        @Query() paginationParameter: PaginationOptionsDTO,
        @Query('sort', StringValidationPipe) sortField: string,
        @Query('order', StringValidationPipe) sortOrder: string,
        @Res() res: Response
    ) {
        const result = await this.searchEngine
        .searchMovies(searchFilter, paginationParameter, sortField, sortOrder);
        res.status(200).json(result);
    }

    @Get(':id')
    async MovieViewDetails(
        @Param('id', ParseIntPipe) id: number,
        @LoggedInUser() userid: number,
        @Res() res: Response
     ) {
        const result = await this.searchEngine
        .getMovieViewDetails(userid, id);
        
        res.status(200).json(result);
    }
    
}