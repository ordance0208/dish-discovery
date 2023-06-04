import { createContext, useReducer, useContext } from 'react';
import { authReducer, DEFAULT_STATE } from './reducer';

const AuthContext = createContext<any>(DEFAULT_STATE);

const AuthProvider = ({ children }: any) => {
  const [auth, dispatch] = useReducer(authReducer, DEFAULT_STATE);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext };

export default AuthProvider;
