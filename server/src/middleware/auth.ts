import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser, ISession } from '../models/User';
import { Document, ObjectId } from 'mongoose';

export interface AuthRequest extends Request {
  user: Document<unknown, {}, IUser> & Omit<IUser & { _id: ObjectId }, never>;
  token: string;
}

const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Authorization failed' });
  }

  try {
    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    const user = await User.findOne({
      _id: decoded.id,
      'sessions.token': token,
    });

    if (!user) {
      return res.status(401).send({ error: 'Authorization failed' });
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err: any) {
    res.status(401).send({ error: err });
  }
};

export default authenticateToken;
