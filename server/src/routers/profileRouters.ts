import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator'
import Users from '../model/Users';
import UserInfo from '../model/UserInfo';
import { authenticateToken } from '../utils';
import type { AuthenticatedRequest } from '../typings/interfaces';


const profileRouters = express.Router();

profileRouters.get('/profile', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // User ID
    const id = (req as AuthenticatedRequest).user.id;
    const response = await UserInfo.findOne({
      where: { userId: id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [{
        model: Users,
        required: false,
        attributes: {
          exclude: ['id', 'password', 'createdAt', 'updatedAt']
        }
      }]
    })
    res.json(response)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

profileRouters.post('/profile', [
  check('firstName')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('lastName')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('bio')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('link')
    .isString()
    .trim()
    .escape()
    .optional(),
  check('images')
    .isString()
    .trim()
    .escape()
    .optional()
], authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const id = (req as AuthenticatedRequest).user.id;
    const checkEmailVerified = await Users.findByPk(id)
    if (!checkEmailVerified?.emailVerified) {
      return res.status(403).json({ message: 'Email verification required. Please verify your email address before updating your account.' })
    }
    const { firstName, lastName, bio, link, images } = req.body;
    const response = await UserInfo.update({ firstName, lastName, bio, link, images }, { where: { userId: id } });
    res.status(200).json({ message: 'Profile has been successfully updated.' })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      next(new Error(err.message))
    }
    throw err;
  }
})

export default profileRouters;