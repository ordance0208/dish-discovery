import * as types from './types';
import { Action } from '../../models/action';
import { IUser } from '../../models/user';

export interface State {
  user: IUser | null;
  loading: boolean;
}

export const DEFAULT_STATE: State = {
  user: null,
  loading: false,
};

export const authReducer = (state: State, action: Action<any>): State => {
  switch (action.type) {
    // Sign up cases
    case types.SIGN_UP: {
      return { ...state, loading: true };
    }
    case types.SIGN_UP_SUCCESS: {
      localStorage.setItem('token', action.payload?.token);
      return { user: action.payload?.user, loading: false };
    }
    case types.SIGN_UP_FAIL: {
      return { ...state, loading: false };
    }

    // Sign in cases
    case types.SIGN_IN: {
      return { ...state, loading: true };
    }
    case types.SIGN_IN_SUCCESS: {
      localStorage.setItem('token', action.payload?.token);
      return { user: action.payload?.user, loading: false };
    }
    case types.SIGN_IN_FAIL: {
      return { ...state, loading: false };
    }

    // Get current user
    case types.GET_CURRENT_USER: {
      return { ...state, loading: true };
    }
    case types.GET_CURRENT_USER_SUCCESS: {
      return { ...state, user: action.payload, loading: false };
    }
    case types.GET_CURRENT_USER_FAIL: {
      localStorage.removeItem('token');
      return { ...state, user: null, loading: false };
    }

    // Sign out cases
    case types.SIGN_OUT: {
      return { ...state, loading: true };
    }
    case types.SIGN_OUT_SUCCESS: {
      localStorage.removeItem('token');
      return { user: null, loading: false };
    }
    case types.SIGN_OUT_FAIL: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};
