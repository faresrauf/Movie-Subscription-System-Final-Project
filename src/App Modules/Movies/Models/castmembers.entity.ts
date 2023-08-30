/*eslint-disable*/
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Entity({ name: 'movies_castmembers' })
export class CastMembers {
  @PrimaryColumn({ name: 'movieid' })
  MovieID: number;

  @PrimaryColumn({ length: 50, name: 'membername' })
  MemberName: string;

  @ManyToOne(() => Movie, (movie) => movie.castMembers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "movieid" })
  Movie: Movie;
}
