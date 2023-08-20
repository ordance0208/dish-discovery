import api from '../api';

export const getUserProfile = function (id: string) {
  return api.get(`/profiles/${id}`).then((res) => res.data);
};
