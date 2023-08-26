import api from '../api';
import { LoginFields, RegisterFields } from '../models/authPayloads';

export const userRegister = function (body: RegisterFields) {
  return api.post('/auth/register', body).then((res) => res.data);
};

export const userLogin = function (body: LoginFields) {
  return api.post('/auth/login', body).then((res) => res.data);
};

export const currentUser = function () {
  return api.get('/auth/session').then((res) => res.data);
};

export const userLogout = function () {
  return api.post('/auth/logout').then((res) => res.data);
};

export const logoutAll = function () {
  return api.post('/auth/logout-all').then((res) => res.data);
};
