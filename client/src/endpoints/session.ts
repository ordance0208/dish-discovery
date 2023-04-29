import api from '../api';
import { LoginFields, RegisterFields } from '../models/authPayloads';

export const userRegister = function (body: RegisterFields) {
  api.post('/auth/register', body).then((res) => res.data);
};

export const userLogin = function (body: LoginFields) {
  api.post('/auth/login', body).then((res) => res.data);
};

export const userLogout = function () {
  api.post('/auth/logout').then((res) => res.data);
};
