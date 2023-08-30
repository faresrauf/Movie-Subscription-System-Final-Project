/*eslint-disable*/
import { Global, Module } from '@nestjs/common';
import *  as nodemailer from 'nodemailer';
import { EmailService } from './email.service';

@Global()
@Module({
  providers: [
    {
      provide: 'MAILER',
      useFactory: () => {
        return nodemailer.createTransport({
          service: 'Gmail' ,
          auth: {
            user: 'faresrauf9@gmail.com',
            pass: '****',
          },
        });
      },
    }, EmailService
  ],
  exports: ['MAILER'],
})
export class EmailModule {}
