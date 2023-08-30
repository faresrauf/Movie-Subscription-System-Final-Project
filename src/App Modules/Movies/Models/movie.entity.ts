/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, Check, OneToMany } from "typeorm";
import { Genre } from "../../Genres/Models/genre.entity";
import { CastMembers } from "./castmembers.entity";
import { View } from "src/App Modules/ViewHistory/Models/view.entity";

@Entity({ name: "movie" })
export class Movie {
  @PrimaryGeneratedColumn()
  movieid: number;

  @Column({ length: 64, nullable: false })
  title: string;

  @Column({ type: "date", nullable: true })
  yearofrelease: Date;

  @Column({ length: 60, nullable: true })
  director: string;

  @Column({ type: "numeric", precision: 2, scale: 1, nullable: true })
  @Check("avgrating >= 0 AND avgrating <= 5")
  avgrating: number;

  @Column({ length: 15, nullable: true })
  duration: string;

  @OneToMany(() => CastMembers, (castMember) => castMember.Movie)
  castMembers: CastMembers[];

  @OneToMany(() => Genre, (genre) => genre.Movie)
  genres: Genre[];

  @OneToMany(() => View, view => view.movie)
  viewHistory: View[];
}
