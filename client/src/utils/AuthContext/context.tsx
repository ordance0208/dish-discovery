import { createContext, useReducer, useContext, useEffect } from 'react';
import * as types from './types';
import { authReducer, DEFAULT_STATE } from './reducer';

const AuthContext = createContext<any>(DEFAULT_STATE);

const AuthProvider = ({ children }: any) => {
  const [auth, dispatch] = useReducer(authReducer, DEFAULT_STATE);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: types.SIGN_IN_SUCCESS, payload: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext };

export default AuthProvider;
