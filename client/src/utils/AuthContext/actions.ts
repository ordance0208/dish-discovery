import { useCallback } from 'react';
import * as types from './types';
import { useAuthContext } from './context';
import { LoginFields, RegisterFields } from '../../models/authPayloads';
import { PersonalInfoPayload } from '../../models/user/userSettingsPayloads';
import {
  userLogin,
  userRegister,
  userLogout,
  currentUser,
  logoutAll,
} from '../../endpoints/session';
import {
  avatarUpload,
  removeAvatar,
  updatePersonalInfo,
} from '../../endpoints/user';

export const useAuthActions = () => {
  const { dispatch } = useAuthContext();

  const registerUser = useCallback(
    async (body: RegisterFields) => {
      dispatch({ type: types.SIGN_UP });
      try {
        const data = await userRegister(body);
        const payload = data;
        dispatch({ type: types.SIGN_UP_SUCCESS, payload });
      } catch (err: any) {
        dispatch({ type: types.SIGN_UP_FAIL });
        throw new Error(err.response.data.error);
      }
    },
    [dispatch]
  );

  const loginUser = useCallback(
    async (body: LoginFields) => {
      dispatch({ type: types.SIGN_IN });
      try {
        const data = await userLogin(body);
        const payload = data;
        dispatch({ type: types.SIGN_IN_SUCCESS, payload });
      } catch (err: any) {
        dispatch({ type: types.SIGN_IN_FAIL });
        throw new Error(err.response.data.error);
      }
    },
    [dispatch]
  );

  const getCurrentUser = useCallback(async () => {
    dispatch({ type: types.GET_CURRENT_USER });
    try {
      const data = await currentUser();
      const payload = data;
      dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload });
    } catch (err: any) {
      if (err.response.status === 401) {
        return dispatch({ type: types.GET_CURRENT_USER_AUTHORIZATION_FAILED });
      }
      dispatch({ type: types.GET_CURRENT_USER_FAIL });
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    dispatch({ type: types.SIGN_OUT });
    try {
      const data = await userLogout();
      const payload = data;
      dispatch({ type: types.SIGN_OUT_SUCCESS, payload });
    } catch (err) {
      dispatch({ type: types.SIGN_OUT_FAIL });
    }
  }, [dispatch]);

  const logoutAllSessions = useCallback(async () => {
    dispatch({ type: types.SIGN_OUT });
    try {
      const data = await logoutAll();
      const payload = data;
      dispatch({ type: types.SIGN_OUT_SUCCESS, payload });
    } catch (err) {
      dispatch({ type: types.SIGN_OUT_FAIL });
    }
  }, [dispatch]);

  const updateUserInfo = useCallback(
    async (body: PersonalInfoPayload) => {
      dispatch({ type: types.UPDATE_USER_INFO });
      try {
        const data = await updatePersonalInfo(body);
        const payload = data;
        dispatch({ type: types.UPDATE_USER_INFO_SUCCESS, payload });
      } catch (err: any) {
        dispatch({ type: types.UPDATE_USER_INFO_FAIL });
        throw new Error(err.response.data.error);
      }
    },
    [dispatch]
  );

  const uploadUserAvatar = useCallback(
    async (formData: FormData) => {
      dispatch({ type: types.UPLOAD_USER_AVATAR });
      try {
        const data = await avatarUpload(formData);
        const payload = data;
        dispatch({ type: types.UPLOAD_USER_AVATAR_SUCCESS, payload });
      } catch (err: any) {
        dispatch({ type: types.UPLOAD_USER_AVATAR_FAIL });
        throw new Error(err.response.data.error);
      }
    },
    [dispatch]
  );

  const removeUserAvatar = useCallback(async () => {
    dispatch({ type: types.REMOVE_USER_AVATAR });
    try {
      await removeAvatar();
      dispatch({ type: types.REMOVE_USER_AVATAR_SUCCESS });
    } catch (err: any) {
      dispatch({ type: types.REMOVE_USER_AVATAR_FAIL });
      throw new Error(err.response.data.error);
    }
  }, [dispatch]);

  const deleteAccount = useCallback(async () => {
    dispatch({ type: types.SIGN_OUT_SUCCESS });
  }, [dispatch]);

  return {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    logoutAllSessions,
    updateUserInfo,
    uploadUserAvatar,
    removeUserAvatar,
    deleteAccount,
  };
};
