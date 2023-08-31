import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';
import Users from "../model/Users";
import { sign } from 'jsonwebtoken';
import { sendOtp, authenticateToken } from "../utils";
import type { AuthenticatedRequest } from "../typings/interfaces";
import { compare } from 'bcrypt'


const usersAuthRouters = express.Router();

usersAuthRouters.post('/register', [
  check('email')
    .isEmail()
    .normalizeEmail()
    .escape(),
  check('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    const checkEmailExist = await Users.count({ where: { email } })
    if (checkEmailExist === 1) {
      return res.status(400).json({ message: 'Email is already in use. Please choose a different email.' });
    }
    const response = await Users.create({
      email,
      password
    })
    const otp = await sendOtp(email);
    return res.json({
      message: 'User successfully registered! An OTP has been sent to your email.',
      token: otp.token
    })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

usersAuthRouters.post('/verify-otp', [
  check('code')
    .isLength({ min: 6 })
    .isInt()
    .trim()
    .escape()
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { code } = req.query;
    const otpCode = (req as AuthenticatedRequest).user.code;
    const email = (req as AuthenticatedRequest).user.email;
    if (otpCode == code) {
      const verifyEmail = await Users.update({ emailVerified: true }, { where: { email } });
      return res.status(200).json({ message: 'OTP verification successful! Redirecting to the dashboard...' })
    }
    return res.status(403).json({ message: 'Incorrect OTP code. Please enter the correct code.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

usersAuthRouters.post('/login', [
  check('email')
    .isEmail()
    .normalizeEmail()
    .escape(),
  check('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    const response = await Users.findOne({ where: { email } })
    if (!response) {
      return res.status(404).json({ message: 'Email not found. Please check your email or consider registering.' })
    }
    const comparePassword = await compare(password, response.password)
    if (comparePassword) {
      const loginToken = sign({ id: response.id }, process.env.USER_SECRET_KEY, { expiresIn: '1hr' });
      return res.json({
        message: 'Login Successfully',
        token: loginToken
      })
    }
    return res.status(500).json({ message: 'Email & Password incorrect. Please check your email and password.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

export default usersAuthRouters;