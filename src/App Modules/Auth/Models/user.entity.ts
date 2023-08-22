/* eslint-disable */
import { SubscriptionDetails } from 'src/App Modules/Subscriptions/Models/subscriptiondetails.entity';
import { View } from 'src/App Modules/ViewHistory/Models/view.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('useraccount')
export class UserAccount {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 255, nullable: true })
  billingaddress: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => SubscriptionDetails, subscription => subscription.User)
  subscriptions: SubscriptionDetails[];

  @OneToMany(() => View, view => view.user)
  viewHistory: View[];
}
