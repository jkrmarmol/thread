import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult, param } from 'express-validator';
import { authenticateToken } from '../utils';
import type { AuthenticatedRequest } from '../typings/interfaces';
import Post from '../model/Post';
import PostReaction from '../model/PostReaction';
import PostComment from '../model/PostComment';
import CommentReply from '../model/CommentReply';


const postRouters = express.Router();
// Start Manipulate Post
postRouters.post('/', [
  check('caption')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('images')
    .isString()
    .escape()
    .optional()
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const id = (req as AuthenticatedRequest).user.id;
    const { caption, images } = req.body;
    const response = await Post.create({ caption, images, userId: id });
    res.status(201).json({ message: 'Post has been successfully created.' });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

postRouters.put('/:id', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  check('caption')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('images')
    .isString()
    .escape()
    .optional()
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { id } = req.params;
    const { caption, images } = req.body;
    const checkPostId = await Post.count({ where: { id } });
    if (!checkPostId) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const response = await Post.update({ caption, images }, { where: { id } })
    return res.status(200).json({ message: 'Post content has been successfully updated.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
});

postRouters.delete('/:id', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id')
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { id } = req.params;
    const checkPostExist = await Post.count({ where: { id } })
    if (!checkPostExist) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const response = await Post.destroy({ where: { id } })
    return res.status(204).json({ message: 'Post has been successfully deleted.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
})
// End Manipulate Post

// Start Post Reaction
postRouters.post('/:id/reaction', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id')
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { id } = req.params;
    const userId = (req as AuthenticatedRequest).user.id;
    const postExist = await Post.count({ where: { id } })
    if (!postExist) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const checkIfAlreadyReacted = await PostReaction.count({ where: { postId: id, userId } });
    if (checkIfAlreadyReacted) {
      const removeReaction = await PostReaction.destroy({ where: { postId: id, userId } })
      return res.status(200).json({ message: 'Your reaction has been removed from the post successfully.' });
    }
    const response = await PostReaction.create({ postId: id, userId })
    return res.status(200).json({ message: 'Post has been liked successfully.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
})
// End Post Reaction

// Start Post Comment
postRouters.post('/:id/comment', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  check('comment')
    .isString()
    .trim()
    .escape()
    .optional(),
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { comment } = req.body;
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const postExist = await Post.count({ where: { id } })
    if (!postExist) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const response = await PostComment.create({ comment, postId: id, userId });
    return res.status(201).json({ message: 'Your comment has been added to the post successfully.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
})

postRouters.put('/:id/comment', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  check('comment')
    .isString()
    .trim()
    .escape(),
  check('commentId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { comment, commentId } = req.body;
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const postExist = await Post.count({ where: { id } })
    if (!postExist) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const response = await PostComment.update({ comment }, {
      where: {
        id: commentId,
        userId: userId,
        postId: id
      }
    })
    // Check the response variable if the post has been modify
    if (response[0] === 1) {
      return res.status(200).json({ message: 'Post has been successfully updated.' });
    }
    return res.status(403).json({ message: 'Unauthorized. You do not have permission to modify this comment.' });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
})

postRouters.delete('/:id/comment', [
  param('id')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  check('commentId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const { commentId } = req.body;
    const postExist = await Post.count({ where: { id } })
    if (!postExist) {
      return res.status(404).json({ message: 'Post not found. The requested post ID does not exist in our system.' })
    }
    const response = await PostComment.destroy({
      where: {
        id: commentId,
        userId,
        postId: id
      }
    });
    if (response) {
      return res.status(204).json({ message: 'Your reply has been successfully deleted.' })
    }
    return res.status(403).json({ message: 'Unauthorized. You do not have permission to delete this comment.' });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
})
// End Post Comment

// Start Comment Reply
postRouters.post('/:postId/comment/:commentId/reply', [
  param('postId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  param('commentId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id'),
  check('comment')
    .isString()
    .trim()
    .escape()
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const userId = (req as AuthenticatedRequest).user.id;
    const checkPostIdExist = await Post.count({ where: { id: postId } })
    if (!checkPostIdExist) {
      return res.status(404).json({ message: 'Post not found. The requested post does not exist in the system.' });
    }
    const checkCommentOnPostIsExist = await PostComment.count({ where: { id: commentId } })
    if (!checkCommentOnPostIsExist) {
      return res.status(404).json({ message: 'Comment not found. The requested comment does not exist in this post.' })
    }
    await CommentReply.create({
      comment,
      userId,
      postCommentId: commentId
    })
    return res.status(201).json({ message: 'Your reply has been successfully added to the comment.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
  }
});
// End Comment Reply

export default postRouters;