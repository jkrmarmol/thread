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
      subject: 'Account Verification - One-Time Password (OTP) Required | Thread',
      html: `<div>
              Dear ${email},
              <br>
              <br>
              Thank you for registering an account with [Your Website/App Name]. We're excited to have you as a part of our community!
              To ensure the security of your account and verify that this email address belongs to you, we need you to complete the 
              registration process by entering the One-Time Password (OTP) provided below on our website.
              <br>
              <b>OTP:${otpCode}</b>
              <br>
              Once you've successfully entered the OTP, your email address will be verified, and your registration will be complete.
              <br>
              If you did not request this registration or are unsure why you received this email, please disregard it. Your account will not be activated until you verify your email.
              <br>
              Please keep your OTP confidential and do not share it with anyone. It's a critical component of your account's security.
              <br>
              Best regards,
              <br>
              <br>
              Kurt Russelle Marmol
              <i>Founder of Kuma Technologies</i>
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