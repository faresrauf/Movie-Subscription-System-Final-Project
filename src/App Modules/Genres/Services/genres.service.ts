/*eslint-disable*/
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { Genre } from "../Models/genre.entity";
import { GenreDetailsDTO } from "../DTOs/GenreDetailsDTO";
import { Movie } from "src/App Modules/Movies/Models/movie.entity";

@Injectable()
export class GenresService {
    constructor(
        public readonly repositoryUtil: RepositoryUtil
    ) { }

    //NOTE: Add pagination 
    async getGenres() { 
        try {
            const genres = await this.repositoryUtil.getRepository(Genre)
            .createQueryBuilder()
            .select('DISTINCT genre')
            .getMany();

            return genres.map(genre => genre.genre);

        } catch (err) {
            throw new InternalServerErrorException();
        }
    }

    async searchGenres(searchFilter?: string) {
        if (!searchFilter) {
            this.getGenres();
        }

        const genreFilter = (`%${searchFilter}%`);
        const genres = await this.repositoryUtil.getRepository(Genre).
            createQueryBuilder()
            .select('DISTINCT genre')
            .where('genre ILIKE :genreLine', { genreLine: genreFilter })
            .orderBy('genre', 'ASC')
            .getRawMany();

        if (!genres) {
            throw new NotFoundException(`No genres found for ${searchFilter}`);
        }

        return genres;
    }

    async getGenreDetails(genre: string): Promise<GenreDetailsDTO> {
        try {
            const movies = await this.repositoryUtil.getRepository(Genre)
                .createQueryBuilder('g')
                .select('m.title', 'title')
                .innerJoin(Movie, 'm', 'm.movieid = g.movieid')
                .where('g.genre = :genreLine', { genreLine: genre })
                .getRawMany();

            const count = await this.repositoryUtil.getRepository(Genre)
                .createQueryBuilder('g')
                .select(' m.title ')
                .innerJoin(Movie, 'm', 'm.movieid = g.movieid')
                .where('g.genre = :genreLine', { genreLine: genre })
                .getCount();

            return new GenreDetailsDTO(
                genre,
                count,
                movies.map(movie => movie.title)
            );

        } catch (err) {
            throw new NotFoundException('No movies or genre available');
        }
    }

}