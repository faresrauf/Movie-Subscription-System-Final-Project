/*eslint-disable*/
import { CastMembers } from "../Models/castmembers.entity";
import { Genre } from "../../Genres/Models/genre.entity";

export class DetailedMovieResponseDTO {
    constructor(
        public Title: string,
        public Genres: Genre[],
        public Poster: string,
        public Director: string,
        public DateOfRelease: Date,
        public Duration: string,
        public Rating: number,
        public castMembers: CastMembers[],
        public Description: string,
        public Status: string
    ) {}
}
