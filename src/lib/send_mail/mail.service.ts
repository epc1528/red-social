import { Injectable } from '@nestjs/common';
import { IMailAccess } from './interface/mail.interface';
import * as jwt from 'jsonwebtoken'
import { jwtsecret } from 'src/util/config/enviroment';
const nodemailer = require("nodemailer");
import { emailCredential } from 'src/util/config/enviroment';

@Injectable()
export class MailService {
  constructor(
  ) {};

sendMail = async (email:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailCredential.email,
          pass: emailCredential.pass,
        },
      });

    const info = await transporter.sendMail({
        from: emailCredential.email,
        to: email,
        subject: "Registro",
        text: "Registro exitoso",
      });
      console.log("Message sent: %s", info.messageId);
}
};