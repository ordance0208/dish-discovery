import Joi from 'joi';

export const personalInfoPayloadSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().min(0).max(320),
});

export const userPasswordPayload = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .invalid(Joi.ref('currentPassword'))
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .required(),
  confirmNewPassword: Joi.string().equal(Joi.ref('newPassword')).required(),
});
