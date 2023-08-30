/*eslint-disable*/
import { Controller, Get, Param, Query, Res, UsePipes } from "@nestjs/common";
import { GenresService } from "./Services/genres.service";
import { TrendGenresService } from "./Services/trendgenres.service";
import { Response } from "express";
import { StringValidationPipe } from "src/Shared Modules/Pipes/string.pipe";

@Controller('genres')
export class GenreController {
    constructor(
        private readonly genresService: GenresService,
        private readonly trendsGenresService: TrendGenresService
    ) {}

    @Get()
    @UsePipes(new StringValidationPipe())
    async retrieveGenres( @Res() res: Response, @Query('search') genreFilter?: string) {
        const result = await this.genresService.searchGenres(genreFilter);
        res.status(200).json(result);
    }

    @Get('details')
    @UsePipes(new StringValidationPipe())
    async retrieveGenreDetails(@Query('genre') genreFilter: string, @Res() res: Response) {
        const result = await this.genresService.getGenreDetails(genreFilter);
        res.status(200).json(result);
    }
}