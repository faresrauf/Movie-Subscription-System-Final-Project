/*eslint-disable*/
import { UserAccount } from 'src/App Modules/Auth/Models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
type SubscriptionState = 'ACTIVE' | 'PENDING' | 'INACTIVE';
type SubscriptionType = 'BASIC' | 'PREMIUM' | 'ADVANCED';

@Entity('subscriptiondetails')
export class SubscriptionDetails {
  @PrimaryGeneratedColumn()
  subscriptionid: number;

  @Column()
  userid: number;

  @Column()
  subscriptionenddate: Date;
  
  @Column() 
  subscriptionprice: number;

  @Column({ type: 'enum', enum: ['ACTIVE','PENDING','INACTIVE'], default: 'PENDING'})
  subscriptionstatus: SubscriptionState;

  @Column({ type: 'enum', enum: ['BASIC', 'PREMIUM', 'ADVANCED'], default: 'BASIC'})
  subscriptiontype: SubscriptionType;

  @ManyToOne(() => UserAccount, user => user.subscriptions)
  @JoinColumn({ name: 'userid' }) 
  User: UserAccount;
}