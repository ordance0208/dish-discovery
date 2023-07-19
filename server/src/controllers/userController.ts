import fs from 'fs';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import multer from 'multer';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const avatar = multer({
  dest: 'avatar',
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      (req as any).fileValidationError = 'Please upload a valid image file';
    }
    cb(null, true);
  },
});

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
  const { fileValidationError } = req as any;

  if (fileValidationError) {
    return res.status(400).send({ error: fileValidationError });
  }
  const avatarUrl = `http://localhost:8000/${req?.file?.path}`;
  try {
    req.user.avatar = avatarUrl;
    await req.user.save();
    res.send(avatarUrl);
  } catch (err: any) {
    res.status(500).send();
  }
};

export const removeAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const fileName = req.user.avatar.split('\\')[1];
    fs.unlink(`${__dirname}/../../avatar/${fileName}`, (err) => {
      if (err) {
        throw new Error('Cannot delete avatar');
      }
    });
    req.user.avatar = '';
    await req.user.save();
    res.send('');
  } catch (err) {
    res.status(500).send();
  }
};

export const updatePersonalInfo = async (req: AuthRequest, res: Response) => {
  const updates = Object.keys(req.body);
  const forbiddenUpdates = ['password'];

  const updateForbidden = updates.some((u: string) =>
    forbiddenUpdates.includes(u)
  );

  if (updateForbidden) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
};

export const updateUserPassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const newPasswordMatch = newPassword === confirmNewPassword;

  if (!newPasswordMatch) {
    return res.status(400).send({ error: 'New password does not match!' });
  }

  const currentPasswordMatch = await bcrypt.compare(
    currentPassword,
    req.user.password
  );

  if (!currentPasswordMatch) {
    return res.status(400).send({ error: 'Current password is not correct!' });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res.status(400).send({ error: 'New password is weak!' });
  }

  try {
    req.user.password = newPassword;
    await req.user.save();
    res.status(200).send({ message: 'Password successfully changed!' });
  } catch (err) {
    res.status(500).send();
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const data = await req.user.deleteOne();
    res.send(data);
  } catch (err) {
    res.status(500).send();
  }
};
