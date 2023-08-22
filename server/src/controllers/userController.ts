import fs from 'fs';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import {
  personalInfoPayloadSchema,
  userPasswordPayload,
} from '../validation/user';

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
    res.status(500).send({ error: err.message });
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
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
};

export const updatePersonalInfo = async (req: AuthRequest, res: Response) => {
  try {
    await personalInfoPayloadSchema.validateAsync(req.body);
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (err: any) {
    if (err.details) {
      return res.status(400).send({ error: 'Invalid data' });
    }
    res.status(500).send({ error: err.message });
  }
};

export const updateUserPassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const currentPasswordMatch = await bcrypt.compare(
    currentPassword,
    req.user.password
  );

  if (!currentPasswordMatch) {
    return res.status(400).send({ error: 'Current password is not correct' });
  }

  if (currentPassword === newPassword) {
    return res
      .status(400)
      .send({ error: 'New password cannot be the same as the current one' });
  }

  try {
    await userPasswordPayload.validateAsync(req.body);
    req.user.password = newPassword;
    await req.user.save();
    res.status(200).send({ message: 'Password successfully changed' });
  } catch (err: any) {
    if (err.details) {
      return res.status(400).send({ error: err.message });
    }
    res.status(500).send({ error: err.message });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const data = await req.user.deleteOne();
    res.send(data);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
};
