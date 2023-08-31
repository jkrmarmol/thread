import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import type { AuthenticatedRequest } from "../typings/interfaces";


export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  verify(token, process.env.USER_SECRET_KEY as string, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as AuthenticatedRequest).user = user;
    next();
  });
}