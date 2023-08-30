/* eslint-disable */
import { Module } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { MoviesController } from "./movie.controller";
import { MovieSearchService } from "./Services/moviesearch.service";
import { ViewModule } from "../ViewHistory/view.module";
import { ViewService } from "../ViewHistory/view.service";

@Module({
    imports: [ViewModule],
    providers: [RepositoryUtil, MovieSearchService, ViewService],
    controllers: [MoviesController],
  })
  export class MoviesModule {}
  