import { Request, Response } from 'express';
import validator from 'validator';
import { AuthRequest } from '../middleware/auth';
import User, { ISession } from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).send({ error: 'Invalid fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'Passwords must match' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: 'Invalid email format' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({ error: 'Password is weak' });
  }

  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
	try {
    const user = await User.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    req.user.sessions = req.user.sessions.filter((session: ISession) => session.token !== req.token);
    req.user.save();
    res.send()
  } catch(err: any) {
    res.status(500).send();
  }
}

export const logoutAll = async (req: AuthRequest, res: Response) => {
  try {
    req.user.sessions = [];
    req.user.save();
    res.send()
  } catch(err: any) {
    res.status(500).send();
  }
}
