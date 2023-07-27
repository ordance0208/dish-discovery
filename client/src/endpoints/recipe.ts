import api from '../api';

export const createRecipe = function (formData: FormData) {
  return api.post('/recipes', formData).then((res) => res.data);
};

export const getRecipe = function (id: string) {
  return api.get(`/recipes/${id}`).then((res) => res.data);
};

export const editRecipe = function (id: string, formData: FormData) {
  return api.put(`/recipes/${id}`, formData).then((res) => res.data);
};

export const deleteRecipe = function (id: string) {
  return api.delete(`/recipes/${id}`).then((res) => res.data);
};
