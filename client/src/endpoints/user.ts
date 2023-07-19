import api from '../api';
import {
  PersonalInfoPayload,
  PasswordPayload,
} from '../models/user/userSettingsPayloads';

export function avatarUpload(formData: FormData) {
  return api.post('/users/avatar', formData).then((res) => res.data);
}

export function removeAvatar() {
  return api.delete('/users/avatar').then((res) => res.data);
}

export function updatePersonalInfo(body: PersonalInfoPayload) {
  return api.patch('/users/update/personal', body).then((res) => res.data);
}

export function updateUserPassword(body: PasswordPayload) {
  return api.patch('/users/update/password', body).then((res) => res.data);
}

export function deleteUserAccount() {
  return api.delete('/users/delete').then((res) => res.data);
}
