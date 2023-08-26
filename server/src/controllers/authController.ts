import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User, { ISession } from '../models/User';
import { registerPayloadSchema } from '../validation/auth';

export const registerUser = async (req: Request, res: Response) => {
  const userAlreadyExsists = await User.findOne({ email: req.body.email });

  if (userAlreadyExsists) {
    return res
      .status(400)
      .send({ error: 'User with that email already exists!' });
  }

  try {
    await registerPayloadSchema.validateAsync(req.body);
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err: any) {
    if (err.details) {
      return res.status(400).send({ error: 'Invalid data' });
    }
    res.status(500).send({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    res.send(req.user);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    req.user.sessions = req.user.sessions.filter(
      (session: ISession) => session.token !== req.token
    );
    req.user.save();
    res.send();
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
};

export const logoutAll = async (req: AuthRequest, res: Response) => {
  try {
    req.user.sessions = [];
    req.user.save();
    res.send();
  } catch (err: any) {
    res.status(500).send({ error: err.emssage });
  }
};
