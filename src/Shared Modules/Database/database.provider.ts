/* eslint-disable */
import { UserAccount } from 'src/App Modules/Auth/Models/user.entity';
import { CastMembers } from 'src/App Modules/Movies/Models/castmembers.entity';
import { Genre } from 'src/App Modules/Genres/Models/genre.entity';
import { Movie } from 'src/App Modules/Movies/Models/movie.entity';
import { SubscriptionDetails } from 'src/App Modules/Subscriptions/Models/subscriptiondetails.entity';
import { View } from 'src/App Modules/ViewHistory/Models/view.entity';
import { DataSource } from 'typeorm';

export const databaseProvider = 
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '965163234',
          database: 'Movie Subscription System',
          entities: [UserAccount, SubscriptionDetails, Movie, Genre, CastMembers, View],
          logging: true,
          synchronize: false,
      });

      return dataSource.initialize();
    }
  };