import nodemailer from 'nodemailer';
import { sign } from 'jsonwebtoken';


const { GMAIL_EMAIL, GMAIL_APP_PASSWORD, USER_SECRET_KEY } = process.env;

export default async function (email: string): Promise<{ status: number; token: string; }> {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD
      }
    });

    const registerToken = sign({ code: otpCode, email }, USER_SECRET_KEY, { expiresIn: '5mins' });
    const option = {
      from: 'Thread <jkrmarmol@gmail.com>',
      to: email,
      subject: 'OTP | Thread',
      html: `<div>
              Dear ${email},
              <br>
              <br>
              <br>
              ${otpCode}
              <br>
              <br>
              Best regards,
              <br>
              <br>
              Kurt Russelle Marmol
            </div >
      `,
      headers: {
        priority: 'high',
        importance: 'high'
      }
    }
    const transEmail = await transporter.sendMail(option)
    return {
      status: 200,
      token: registerToken
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
    }
    throw err;
  }
}