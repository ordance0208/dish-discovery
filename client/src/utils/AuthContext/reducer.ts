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
      return { user: action.payload, loading: false };
    }
    case types.SIGN_UP_FAIL: {
      return { ...state, loading: false };
    }

		// Sign in cases
    case types.SIGN_IN: {
      return { ...state, loading: true };
    }
    case types.SIGN_IN_SUCCESS: {
      return { user: action.payload, loading: false };
    }
    case types.SIGN_IN_FAIL: {
      return { ...state, loading: false };
    }

		// Sign out cases
    case types.SIGN_OUT: {
      return { ...state, loading: true };
    }
    case types.SIGN_OUT_SUCCESS: {
      return { user: null, loading: false };
    }
    case types.SIGN_OUT_FAIL: {
      return { ...state, loading: false };
    }
    default: {
      return state
    }
  }
};
