/*eslint-disable*/
import { Injectable, InternalServerErrorException, NotFoundException, UseGuards } from "@nestjs/common";
import { RepositoryUtil } from "src/Shared Modules/Repository/repositoryutil";
import { View } from "./Models/view.entity";
import { PaginationOptionsDTO } from "src/Shared Modules/DTOs/PaginationOptionsDTO";

@Injectable()
export class ViewService {
    constructor(
        private readonly repositoryUtil: RepositoryUtil
    ) { }

    async logMovieView(viewerID: number, movieID: number) {
        try {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            await this.repositoryUtil.getRepository(View)
                .save({
                    userid: viewerID,
                    movieid: movieID,
                    viewdate: currentDate,
                    viewtime: new Date()
                });
            return 'View loged in succesfully';
        } catch (err) {
            throw new InternalServerErrorException('Cannot display the movie, try display again');
        }
    }

    async getViewsOfUser(
        currentuser: number,
        paginationParameter: PaginationOptionsDTO,
        mostRecent: boolean,
    ): Promise<View[]> {
        try {
            const defaultPage = 0;
            const defaultSize = 10;
            
            const page = paginationParameter.page ?? defaultPage;
            const items = paginationParameter.items ?? defaultSize;

            mostRecent = mostRecent ?? true;
            const sortOrder = mostRecent ? 'DESC' : 'ASC';
            
            const views = this.repositoryUtil.getRepository(View)
                .find({
                    where: { userid: currentuser },
                    skip: (page) * items,
                    take: items,
                    order: {
                        viewdate: sortOrder
                    }
                });

            if (!views) {
                throw new NotFoundException('No View History Found for the user');
            }

            return views as unknown as View[];

        } catch (err) {
            if (err instanceof NotFoundException)
                throw new NotFoundException('No View History Found for the user');
            throw new InternalServerErrorException();
        }
    }

    async checkView(userid: number, movieid: number): Promise<boolean> {
        try {
            const view = await this.repositoryUtil.getRepository(View)
                .createQueryBuilder()
                .select('viewid')
                .where('userid = :user', { user: userid })
                .andWhere('movieid = :movie', { movie: movieid })
                .getRawOne();

            return !!view;

        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}