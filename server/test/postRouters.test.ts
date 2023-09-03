import { describe, it, before, after } from 'mocha'
import { assert } from 'chai';
import request from 'supertest';
import { verify, JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import app from '../src/server';
import Post from '../src/model/Post';
import Users from '../src/model/Users';
import UserInfo from '../src/model/UserInfo';
import PostComment from '../src/model/PostComment';


config()
export default describe('Post Router', async () => {

  let userToken = '';
  let userId = '';

  before(async () => {
    const endpoint = '/api/auth/login'
    const email = 'test@gmail.com';
    const password = '@Test123';
    const response = await request(app).post(endpoint).send({ email, password })
    userToken = response.body.token;
    userId = (verify(userToken, process.env.USER_SECRET_KEY) as JwtPayload).id;
  })

  after(async () => {
    const getId = await Users.findOne({ where: { email: 'test@gmail.com' } })
    // await Post.destroy({ where: { userId: getId?.id } })
    await UserInfo.destroy({ where: { userId: getId?.id } })
    await Users.destroy({ where: { id: getId?.id } })
  })

  describe('POST /api/post', async () => {
    it('should successful post a content on account', async () => {
      const caption = '';
      const images = '/pic.png';
      const message = { message: "Post has been successfully created." }
      const response = await request(app)
        .post('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ caption, images })

      assert.strictEqual(response.statusCode, 201)
      assert.deepStrictEqual(response.body, message)
    });
  })

  describe('PUT /api/post/:id', async () => {
    it('should update the post by user', async () => {
      const postData = await Post.findOne({ where: { userId } });
      const caption = 'test';
      const images = '/test.png';
      const message = { message: 'Post content has been successfully updated.' }
      const response = await request(app)
        .put(`/api/post/${postData?.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ caption, images })
      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.body, message)
    });

    it('should throw an error if the post id is not found', async () => {
      const fakePostID = '49816d7b-8ee2-484d-9eb8-d135a9d3994a';
      const caption = 'test';
      const images = '/test.png';
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' }
      const response = await request(app)
        .put(`/api/post/${fakePostID}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ caption, images })
      assert.strictEqual(response.statusCode, 404);
      assert.deepStrictEqual(response.body, message)
    });

    it('should throw error if the post uuid v4 is not valid', async () => {
      const fakePostID = '49816d7b-8ee2-484d-9eb8-d135a9d3994';
      const caption = 'test';
      const images = '/test.png';
      const response = await request(app)
        .put(`/api/post/${fakePostID}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ caption, images });
      assert.strictEqual(response.statusCode, 400);
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    })
  })

  describe('POST /api/post/:id/reaction', async () => {

    it('should show error message if the post ID is not found', async () => {
      const fakePostId = '7aa9d390-a647-4732-98c0-68f9b4222321'
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' };
      const response = await request(app)
        .post(`/api/post/${fakePostId}/reaction`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 404)
      assert.deepStrictEqual(response.body, message);
    });

    it('should show if the post ID is not valid', async () => {
      const fakePostId = 'kyugrf3d'
      const response = await request(app)
        .post(`/api/post/${fakePostId}/reaction`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 400)
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    });

    it('should react the user to their own post', async () => {
      const fakePostId = '7aa9d390-a647-4732-98c0-68f9b4222321'
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' };
      const response = await request(app)
        .post(`/api/post/${fakePostId}/reaction`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 404)
      assert.deepStrictEqual(response.body, message);
    });

    it('should react the user to their own post', async () => {
      const message = { message: 'Post has been liked successfully.' }
      const getPostId = await Post.findOne({ where: { userId } })
      const response = await request(app)
        .post(`/api/post/${getPostId?.id}/reaction`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 200)
      assert.deepStrictEqual(response.body, message);
    });

    it('should remove the user reaction to their own post', async () => {
      const message = { message: 'Your reaction has been removed from the post successfully.' };
      const getPostId = await Post.findOne({ where: { userId } })
      const response = await request(app)
        .post(`/api/post/${getPostId?.id}/reaction`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 200)
      assert.deepStrictEqual(response.body, message);
    })

  });

  describe('POST /api/post/:id/comment', async () => {
    it('should show message when the comment on post is successful commented', async () => {
      const message = { message: 'Your comment has been added to the post successfully.' }

      const getPostId = await Post.findOne({ where: { userId } })
      const response = await request(app)
        .post(`/api/post/${getPostId?.id}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ comment: 'Hello World reply' });

      assert.strictEqual(response.statusCode, 201)
      assert.deepStrictEqual(response.body, message)
    });
    it('should show error message if the post id is not found when commenting on post', async () => {
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' }
      const fakePostID = '7aa9d390-a647-4732-98c0-68f9b4222321'
      const response = await request(app)
        .post(`/api/post/${fakePostID}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ comment: 'trying modifying existing comment' });
      assert.strictEqual(response.statusCode, 404)
      assert.isTrue(response.notFound)
      assert.deepStrictEqual(response.body, message);
    });

    it('should throw error if the post uuid v4 is not valid when commenting on post', async () => {
      const fakePostID = 'klsjdhfhuiksdf';

      const response = await request(app)
        .put(`/api/post/${fakePostID}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ comment: 'HEHEY' });

      assert.strictEqual(response.statusCode, 400);
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    });
  });

  describe('PUT /api/post/:id/comment', async () => {
    it('should show message if the reply is successful updated', async () => {
      const getPostId = await Post.findOne({ where: { userId } })
      const getLatestReplyOnPost = await PostComment.findOne({ where: { userId } })
      const message = { message: 'Post has been successfully updated.' }

      const response = await request(app)
        .put(`/api/post/${getPostId?.id}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          commentId: getLatestReplyOnPost?.id,
          comment: 'I am modifying my current reply on this post to be this message'
        });

      assert.strictEqual(response.statusCode, 200)
      assert.deepStrictEqual(response.body, message);
      assert.isTrue(response.ok);
    });

    it('should throw error message if the post id is not valid when updating a reply on post', async () => {
      const notValidPostId = 'jkhbsdfybusdrf'
      const getLatestReplyOnPost = await PostComment.findOne({ where: { userId } })

      const response = await request(app)
        .put(`/api/post/${notValidPostId}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          commentId: getLatestReplyOnPost?.id,
          comment: 'I am modifying my current reply on this post to be this message'
        });

      assert.strictEqual(response.statusCode, 400)
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    });

    it('should throw error message if the post id is not found when updating a reply on post', async () => {
      const validPostIdButNotExisting = '140b2685-005e-4244-b172-e2cf4e577bcb'
      const getLatestReplyOnPost = await PostComment.findOne({ where: { userId } })
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' }

      const response = await request(app)
        .put(`/api/post/${validPostIdButNotExisting}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          commentId: getLatestReplyOnPost?.id,
          comment: 'I am modifying my current reply on this post to be this message'
        });

      assert.strictEqual(response.statusCode, 404)
      assert.deepStrictEqual(response.body, message);
      assert.isTrue(response.notFound);
    });

    // it('should throw error message if the post id is valid but you are updating other reply on post', async () => {
    //   const otherReplyId = 'b77bea16-86c9-47e1-a889-5c8477e8089d';

    //   const getLatestReplyOnPost = await PostComment.findOne({ where: { userId } })
    //   const message = { message: 'Unauthorized. You do not have permission to modify this comment.' }

    //   const response = await request(app)
    //     .put(`/api/post/${getLatestReplyOnPost?.postId}/comment`)
    //     .set('Authorization', `Bearer ${userToken}`)
    //     .send({
    //       commentId: otherReplyId,
    //       comment: 'I am modifying my current reply on this post to be this message'
    //     });

    //   assert.strictEqual(response.statusCode, 403)
    //   assert.deepStrictEqual(response.body, message);
    //   assert.isTrue(response.forbidden);
    // });
  })

  describe('DELETE /api/post/:id/comment', async () => {

    it('should throw error if the post uuid v4 is not valid when deleting comment on post', async () => {
      const fakePostID = 'klsjdhfhuiksdf';

      const response = await request(app)
        .put(`/api/post/${fakePostID}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ commentId: 'sdfklujgsdf9' });

      assert.strictEqual(response.statusCode, 400);
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    });

    it('should throw error if the post uuid is not found when deleting comment on post', async () => {
      const validPostIdButNotExisting = 'b77bea16-86c9-47e1-a889-5c8477e8089f';
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' }
      const response = await request(app)
        .delete(`/api/post/${validPostIdButNotExisting}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ commentId: 'f6d1b7f0-ca8c-4e78-8308-a2b0c883671d' });

      assert.strictEqual(response.statusCode, 404)
      assert.isTrue(response.notFound)
      assert.deepStrictEqual(response.body, message)
    });

    // it('should throw error if you trying to delete other reply on post', async () => {
    //   const getLatestReply = await PostComment.findOne({ where: { userId } });
    //   const otherReplyId = 'b77bea16-86c9-47e1-a889-5c8477e8089d';
    //   const message = { message: 'Unauthorized. You do not have permission to delete this comment.' }

    //   const response = await request(app)
    //     .delete(`/api/post/${getLatestReply?.postId}/comment`)
    //     .set('Authorization', `Bearer ${userToken}`)
    //     .send({ commentId: otherReplyId });

    //   assert.strictEqual(response.statusCode, 403);
    //   assert.deepStrictEqual(response.body, message);
    //   assert.isTrue(response.forbidden);
    // })

    it('should show successful message when the reply on post is deleted', async () => {
      const getLatestReply = await PostComment.findOne({ where: { userId } });

      const response = await request(app)
        .delete(`/api/post/${getLatestReply?.postId}/comment`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ commentId: getLatestReply?.id })

      assert.strictEqual(response.statusCode, 204)
      assert.isTrue(response.noContent)

    });

  })

  describe('DELETE /api/post/:id', async () => {
    it('should throw error if the post uuid v4 is not valid', async () => {
      const fakePostID = '49816d7b-8ee2-484d-9eb8-d135a9d3994';
      const response = await request(app)
        .delete(`/api/post/${fakePostID}`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 400);
      assert.isObject(response.body);
      assert.isTrue(response.badRequest);
    })

    it('should throw an error if the post id is not found', async () => {
      const fakePostID = '49816d7b-8ee2-484d-9eb8-d135a9d3994a';
      const message = { message: 'Post not found. The requested post ID does not exist in our system.' }
      const response = await request(app)
        .delete(`/api/post/${fakePostID}`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 404);
      assert.deepStrictEqual(response.body, message)
    });

    it('should successful message when the post has been deleted', async () => {
      const getPostId = await Post.findOne({ where: { userId } })
      const response = await request(app)
        .delete(`/api/post/${getPostId?.id}`)
        .set('Authorization', `Bearer ${userToken}`)
      assert.strictEqual(response.statusCode, 204);
      assert.deepStrictEqual(response.body, {});
    });

  })
})