/*eslint-disable*/
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { Genre } from "../Models/genre.entity";
import { Movie } from "src/App Modules/Movies/Models/movie.entity";
import { View } from "src/App Modules/ViewHistory/Models/view.entity";

@Injectable()
export class TrendGenresService {
    constructor(
        private readonly repositoryUtil: RepositoryUtil
    ) {}

    async getTop5TrendGenres() { // todo: Refactor method also to handle the user fav. genres
        try{
            return await this.repositoryUtil.getRepository(View)
                .createQueryBuilder('g')
                .select('g.genre', 'Genre')
                .addSelect('COUNT(*)', 'numOfViews')
                .innerJoin(Movie, 'm', 'm.movieid = v.movieid')
                .innerJoin(Genre, 'g', 'm.movieid = g.movieid')
                .groupBy('g.genre')
                .orderBy('numOfViews', 'DESC')
                .limit(5)
                .getMany();

        } catch(err) {
            throw new InternalServerErrorException('Service Unavailable');
        }
    }

}