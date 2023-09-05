import express, { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator'
import { authenticateToken } from '../utils';
import Friend from '../model/Friend';
import { AuthenticatedRequest } from '../typings/interfaces';
import Users from '../model/Users';


const friendRouters = express.Router();

friendRouters.post('/:followId/follow', [
  param('followId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id')
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { followId } = req.params;
    const userId = (req as AuthenticatedRequest).user.id;
    if (userId === followId) return res.status(400).json({ message: 'Invalid operation. You cannot follow yourself.' })

    const checkAlreadyFriend = await Friend.count({ where: { userId, followId } })
    if (checkAlreadyFriend) return res.status(400).json({ message: 'Invalid operation. You are already friends with this user.' })

    const checkFollowIdExist = await Users.count({ where: { id: followId } })
    if (!checkFollowIdExist) return res.status(404).json({ message: 'User not found. The requested user does not exist in the database.' })

    const response = await Friend.create({ userId, followId })
    return res.status(200).json({ message: 'You are now following the user.' })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
      next(new Error(err.name))
    }
  }
})

friendRouters.post('/:followId/unfollow', [
  param('followId')
    .isUUID(4)
    .withMessage('Invalid UUIDv4 format for id')
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { followId } = req.params;
    const userId = (req as AuthenticatedRequest).user.id;
    const checkFollowIdExist = await Users.count({ where: { id: followId } })
    if (userId === followId) return res.status(400).json({ message: 'Invalid operation. You cannot unfollow yourself.' })
    if (!checkFollowIdExist) return res.status(404).json({ message: 'User not found. The requested user does not exist in the database.' })

    const checkIfFriend = await Friend.count({ where: { userId, followId } })
    if (!checkIfFriend) return res.status(400).json({ message: 'Invalid operation. You are not friends with this user.' })

    await Friend.destroy({ where: { userId, followId } })
    return res.status(200).json({ message: 'You have successfully unfollowed the user.' })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
      next(new Error(err.name))
    }
  }
});

export default friendRouters;