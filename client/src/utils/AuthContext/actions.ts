import { useCallback } from 'react';
import * as types from './types';
import { useAuthContext } from './context';
import { LoginFields, RegisterFields } from '../../models/authPayloads';
import {
  userLogin,
  userRegister,
  userLogout,
  currentUser,
} from '../../endpoints/session';

export const useAuthActions = () => {
  const { dispatch } = useAuthContext();

  const registerUser = useCallback(
    async (body: RegisterFields) => {
      dispatch({ type: types.SIGN_UP });
      try {
        const data = await userRegister(body);
        const payload = data;
        dispatch({ type: types.SIGN_UP_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: types.SIGN_UP_FAIL });
        console.log('Cannot register: ', err);
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
        throw new Error(err.message);
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
    } catch (err) {
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
      console.log('Cannot sign out: ', err);      
    }
  }, [dispatch]);

  return {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
  };
};
