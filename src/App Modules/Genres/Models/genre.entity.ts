/*eslint-disable*/
import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Movie } from '../../Movies/Models/movie.entity';

@Entity({ name: 'movies_genre'})
export class Genre {
    @PrimaryColumn({ name: 'movieid' })
    movieid : number;

    @PrimaryColumn({ name: 'genre' })
    genre : string;

    @ManyToOne( () => Movie, (movie) => movie.genres)
    @JoinColumn({ name: "movieid" })
    Movie : Movie;
}