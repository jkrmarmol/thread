import { describe, it, after, before } from 'mocha'
import request from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken'
import app from '../src/server';
import { assert } from 'chai';
import Users from '../src/model/Users';
import UserInfo from '../src/model/UserInfo';


export default describe('Friend Routers', async () => {
  let userFirstAccountToken = '';
  let userFirstId = '';

  let userSecondAccountToken = ''
  let userSecondId = '';

  before(async () => {
    // Start Login Test Account
    const endpoint = '/api/auth/login'
    const email = 'test@gmail.com';
    const password = '@Test123';
    const loginFirstAccount = await request(app).post(endpoint).send({ email, password })
    userFirstAccountToken = loginFirstAccount.body.token;
    userFirstId = (verify(userFirstAccountToken, process.env.USER_SECRET_KEY) as JwtPayload).id;
    // End Login Test Account

    // Start Create other account to test friend router by following them
    const loginAccount = { email: 'test1@gmail.com', password: '@Test1123' }
    const registerSecondAccount = await request(app).post(`/api/auth/register`).send({ email: loginAccount.email, password: loginAccount.password });
    const jwtToken: any = verify(registerSecondAccount.body.token, process.env.USER_SECRET_KEY)
    const verifyOtp = (await request(app).post('/api/auth/verify-otp')
      .set('Authorization', `Bearer ${registerSecondAccount.body.token}`)
      .query({ code: jwtToken.code }))
    const loginSecondAccount = await request(app).post('/api/auth/login').send({ email: loginAccount.email, password: loginAccount.password })
    userSecondAccountToken = loginSecondAccount.body.token;
    userSecondId = (verify(userSecondAccountToken, process.env.USER_SECRET_KEY) as JwtPayload).id;
    // End Create other account to test friend router by following them

  })

  after(async () => {
    const getFirstAccount = await Users.findOne({ where: { email: 'test@gmail.com' } })
    await UserInfo.destroy({ where: { userId: getFirstAccount?.id } })
    await Users.destroy({ where: { id: getFirstAccount?.id } })

    const hetSecondAccount = await Users.findOne({ where: { email: 'test1@gmail.com' } })
    await UserInfo.destroy({ where: { userId: hetSecondAccount?.id } })
    await Users.destroy({ where: { id: hetSecondAccount?.id } })
  })

  describe('POST /api/friend/:followId/follow', async () => {
    it('should throw error if the follow id is not valid as uuidv4 when following other user', async () => {
      const notValidUUID = 'ikunasdfgyusdf'
      const response = await request(app)
        .post(`/api/friend/${notValidUUID}/follow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
      assert.isObject(response.body)
    });

    it('should throw an error if the user is follow herself', async () => {
      const message = { message: 'Invalid operation. You cannot follow yourself.' }
      const response = await request(app)
        .post(`/api/friend/${userFirstId}/follow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
    });

    it('should throw an error if the user is follow the other user that are not existing', async () => {
      const userIdNotExist = '5d0c696f-41e2-44fa-8bc5-55be1740c572'
      const message = { message: 'User not found. The requested user does not exist in the database.' }
      const response = await request(app)
        .post(`/api/friend/${userIdNotExist}/follow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.notFound);
      assert.strictEqual(response.statusCode, 404)
    });

    it('should show success message when you follow other user', async () => {
      const message = { message: 'You are now following the user.' }
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/follow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.ok);
      assert.strictEqual(response.statusCode, 200)
    });

    it('should throw error if there is no authentication when following user ', async () => {
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/follow`)

      assert.isTrue(response.unauthorized);
      assert.strictEqual(response.statusCode, 401)
    });

    it('should throw an error if the user is follow the user that already follow', async () => {
      const message = { message: 'Invalid operation. You are already friends with this user.' }
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/follow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
    });
  });

  describe('POST /api/friend/:followId/unfollow', async () => {

    it('should throw error if the follow id is not valid uuid when unfollowing user', async () => {
      const notValidUUID = 'jyhsvdfsedf';
      const response = await request(app)
        .post(`/api/friend/${notValidUUID}/unfollow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
      assert.isObject(response.body)
    });

    it('should throw error when you unfollow yourself', async () => {
      const message = { message: 'Invalid operation. You cannot unfollow yourself.' }
      const response = await request(app)
        .post(`/api/friend/${userFirstId}/unfollow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
    });

    it('should throw an error if you unfollow the user that does not exist', async () => {
      const validIdButNotExisting = 'b4cdb1ea-147f-45dd-9383-5de517a91d0b'
      const message = { message: 'User not found. The requested user does not exist in the database.' }
      const response = await request(app)
        .post(`/api/friend/${validIdButNotExisting}/unfollow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.notFound);
      assert.strictEqual(response.statusCode, 404)
    });

    it('should show success message when you unfollow user', async () => {
      const message = { message: 'You have successfully unfollowed the user.' }
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/unfollow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.ok);
      assert.strictEqual(response.statusCode, 200)
    });

    it('should throw an error if you have no authentication when you unfollow your friend', async () => {
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/unfollow`)

      assert.isTrue(response.unauthorized);
      assert.strictEqual(response.statusCode, 401)
    });

    it('should throw an error if you unfollow the user that not your friend', async () => {
      const message = { message: 'Invalid operation. You are not friends with this user.' }
      const response = await request(app)
        .post(`/api/friend/${userSecondId}/unfollow`)
        .set('Authorization', `Bearer ${userFirstAccountToken}`)

      assert.deepStrictEqual(response.body, message)
      assert.isTrue(response.badRequest);
      assert.strictEqual(response.statusCode, 400)
    });
  });
})