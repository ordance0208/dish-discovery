import mongoose, { Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface ISession {
  token: string,
  _id: string
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sessions: ISession[];
  generateAuthToken: () => void;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<IUser>;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.statics.findUserByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '7d' });
  user.sessions = user.sessions.concat({ token });

  await user.save();
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
