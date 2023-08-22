/*eslint-disable*/
import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { Like } from "typeorm";
import { Movie } from "../Models/movie.entity";
import { SearchOptionsDTO } from "../DTOs/SearchOptionsDTO";
import { SortOptions, SortOrder } from "../DTOs/SortOptionsDTO";
import { PaginationOptionsDTO } from "../../../Shared Modules/DTOs/PaginationOptionsDTO";
import { config } from 'dotenv';
import { DetailedMovieResponseDTO } from "../DTOs/DetailedMovieResponseDTO";
import { ViewService } from "src/App Modules/ViewHistory/view.service";
config();

@Injectable()
export class MovieSearchService {
    constructor(
        private readonly repositoryUtil: RepositoryUtil,
        private readonly viewService: ViewService
    ) { }

    async searchMovies(
        searchFilter: SearchOptionsDTO,
        paginationParameter: PaginationOptionsDTO,
        sortField: string,
        sortOrder: string
    ): Promise<Movie[]> {
        const MovieRepository = this.repositoryUtil.getRepository(Movie);

        if (searchFilter.title) {
            searchFilter.title = Like(`%${searchFilter.title}%`);
        }

        const page = paginationParameter.page ?? 0;
        const items = paginationParameter.items ?? 10;
        const sortParameter = sortField ?? 'yearofrelease';
        const orderParameter = sortOrder ?? 'DESC';

        if (!SortOptions.includes(sortParameter)) {
            throw new BadRequestException('Invalid order field');
        }

        if (!SortOrder.includes(orderParameter)) {
            throw new BadRequestException('Invalid sort order');
        }

        const searchResult = await MovieRepository.find({
            relations: ['genres'],
            where: searchFilter,
            skip: (page) * items,
            take: items,
            order: {
                [sortParameter]: orderParameter
            }
        });

        if (!searchResult) {
            throw new NotFoundException('No movies found in the system, try again.')
        }

        return searchResult as Movie[];
    }

    async getMovieViewDetails(userid: number, movieid: number) {
        const movie = await this.repositoryUtil.getRepository(Movie)
            .findOne({
                relations: ['genres', 'castMembers'],
                where: { movieid: movieid }
            });

        const movieIMDBData = await
            this.fetchMoviePosterAndDescription(movie.title);

        const genreNames = movie.genres.map(genre => genre.genre);
        const castMembersNames = movie.castMembers.map(castmember => castmember.MemberName);

        const status = (await this.viewService.checkView(userid,movieid)) ? 'WATCHED' : 'UNWATCHED';

        return new DetailedMovieResponseDTO(
            movie.title,
            genreNames,
            movieIMDBData[0],
            movie.director,
            movie.yearofrelease,
            movie.duration,
            movie.avgrating,
            castMembersNames,
            movieIMDBData[1],
            status
        );
    }

    async fetchMoviePosterAndDescription(title: string) {
        try {
            const movieData = await fetch(process.env.API_IMDB + title);
            const movieResponse = await movieData.json();

            if (!movieResponse || !movieResponse.Poster || !movieResponse.Plot) {
                throw new NotFoundException("Movie data not found");
            }

            return [movieResponse.Poster, movieResponse.Plot];
        } catch (err) {
            if (err instanceof NotFoundException) {
                throw new NotFoundException("Movie data not found");

            }
            throw new InternalServerErrorException("An error happened while fetching from the API.");
        }
    }
}