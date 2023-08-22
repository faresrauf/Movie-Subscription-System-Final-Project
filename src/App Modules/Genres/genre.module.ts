/*eslint-disable*/
import { Module } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { GenresService } from "./Services/genres.service";
import { TrendGenresService } from "./Services/trendgenres.service";
import { GenreController } from "./genre.controller";


@Module({
    providers: [RepositoryUtil, GenresService, TrendGenresService],
    controllers: [GenreController]
})
export class GenreModules{ }