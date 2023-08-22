/*eslint-disable*/
import { UserAccount } from "src/App Modules/Auth/Models/user.entity";
import { Movie } from "src/App Modules/Movies/Models/movie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('viewhistory')
export class View {
    @PrimaryGeneratedColumn()
    viewid: number;

    @Column()
    userid: number;

    @Column()
    movieid: number;

    @Column()
    viewdate: Date;

    @Column()
    viewtime: Date;

    @ManyToOne(() => UserAccount, user => user.viewHistory)
    @JoinColumn({ name: "userid" })
    user: UserAccount;

    @ManyToOne(() => Movie, movie => movie.viewHistory)
    @JoinColumn({ name: "movieid" })
    movie: Movie;}