import * as types from './types';
import { useCallback } from 'react';
import { useAuthContext } from './context';
import { LoginFields, RegisterFields } from '../../models/authPayloads';
import { userLogin, userRegister, userLogout } from '../../endpoints/session';

export const useAuthActions = () => {
  const { dispatch } = useAuthContext();

  const registerUser = useCallback(
    async (body: RegisterFields) => {
      console.log('called')
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
      } catch (err) {
        dispatch({ type: types.SIGN_IN_FAIL });
        console.log('Cannot login: ', err);
      }
    },
    [dispatch]
  );

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
    logoutUser,
  };
};
