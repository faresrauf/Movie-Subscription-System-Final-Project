/*eslint-disable*/
import { HttpException, Inject } from "@nestjs/common";

export class EmailService {
constructor(
    @Inject('MAILER') private readonly mailer
    ) {}
    //Make generic function and change temaplate parameter's.
async sendConfirmationEmail(emailData) {
    const mailOptions = {
        from: 'faresrauf9@gmail.com',
        to: emailData.email,
        subject: 'Welcome to Our Family',
        template: {
          name: 'email-template',
          engine: 'handlebars',
          context: {
            name: emailData.name,
            message: `Thank you for joining our Movie System, confirm your account: ${emailData.username}!`,
          },
        },
      };
      
      try {
     this.mailer.sendMail(mailOptions);
      } catch(err) {
        throw new HttpException(err, err.message);
      }
}

}