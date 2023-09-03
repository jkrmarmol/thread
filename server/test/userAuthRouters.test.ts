import request from 'supertest';
import { describe, it, after } from 'mocha';
import { assert } from 'chai'
import { verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import app from '../src/server';


config();
export default describe('User Authentication Router', async () => {

  let optToken = '';

  describe('POST /api/auth/register', async () => {
    it('should show success message when the email is correct and not been taken by another user', async () => {
      const email = 'test@gmail.com';
      const password = '@Test123';
      const endpoint = '/api/auth/register'
      const message = 'User successfully registered! An OTP has been sent to your email.'

      const response = await request(app).post(endpoint).send({ email, password });

      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.body.message, message);
      optToken = response.body.token
    });

    it('should throw error if the email has been taken by another user', async () => {
      const email = 'test@gmail.com';
      const password = '@Test123';
      const endpoint = '/api/auth/register'
      const message = { message: 'Email is already in use. Please choose a different email.' }

      const response = await request(app).post(endpoint).send({ email, password });

      assert.strictEqual(response.statusCode, 400);
      assert.deepStrictEqual(response.body, message);
    });
  })

  describe('POST /api/auth/verify-otp', async () => {

    it('should throw an error if the otp code submitted is wrong', async () => {
      const endpoint = '/api/auth/verify-otp'
      const jwtToken: any = verify(optToken, process.env.USER_SECRET_KEY)
      const notValidOTP = 123456;
      const message = { message: 'Incorrect OTP code. Please enter the correct code.' }

      const response = (await request(app).post(endpoint).set('Authorization', `Bearer ${optToken}`).query({ code: notValidOTP }))

      assert.strictEqual(response.statusCode, 403);
      assert.deepStrictEqual(response.body, message)
    });

    it('should check the otp code if it is valid on time', async () => {
      const endpoint = '/api/auth/verify-otp'
      const jwtToken: any = verify(optToken, process.env.USER_SECRET_KEY)
      const validOTP = jwtToken.code;
      const message = { message: 'OTP verification successful! Redirecting to the dashboard...' }

      const response = (await request(app).post(endpoint).set('Authorization', `Bearer ${optToken}`).query({ code: validOTP }))

      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.body, message)
    });
  });

  describe('POST /api/auth/login', async () => {
    it('should throw error message if the email and password input has no value', async () => {
      try {
        // Setup
        const email = '';
        const password = '';
        const endpoint = '/api/auth/login'

        // Exercise 
        const response = await request(app).post(endpoint).send({ email, password })

        // Verify
        assert.strictEqual(response.statusCode, 400)
        assert.isObject(response.body)
      } catch (err) {
        if (err instanceof Error) {
          console.log(err)
        }
      }
    });

    it('should throw error message if the email is incorrect', async () => {
      try {
        // Setup
        const email = 'test@gmail.com';
        const password = '@Gagukaba123';
        const endpoint = '/api/auth/login'
        const message = { message: 'Email & Password incorrect. Please check your email and password.' }
        const statusCode = 500;

        const response = await request(app).post(endpoint).send({ email, password })

        assert.deepStrictEqual(response.body, message)
        assert.strictEqual(response.statusCode, statusCode)
      } catch (err) {
        if (err instanceof Error) {
          console.log(err)
        }
      }
    });

    it('should show success message when the email and password is correct', async () => {
      try {
        const email = 'test@gmail.com';
        const password = '@Test123';
        const endpoint = '/api/auth/login'
        const message = 'Login Successfully';

        const response = await request(app).post(endpoint).send({ email, password });

        assert.equal(response.body.message, message)
        assert.strictEqual(response.statusCode, 200)
      } catch (err) {
        console.log(err)
      }
    });
  });
})