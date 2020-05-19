import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import { Mail } from 'src/models/mail/mail';

@Injectable()
export class MailService {
  private transporter: any;
  private host = 'mail.roamersoft.com';
  private port = 465;
  private secure = true; // true for 465, false for other ports
  private auth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  };

  constructor() {
    this.transporter = Nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: this.auth,
    });
  }

  async sendMail(mail: Mail) {
    return await this.transporter.sendMail(mail);
  }
}
