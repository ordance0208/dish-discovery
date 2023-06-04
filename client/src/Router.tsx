import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthActions } from './utils/AuthContext/actions';
import { PATHS, AUTH_PATHS } from './routes';
import PublicRoute from './utils/PublicRoute';
import Home from './views/Home';
import SignUp from './views/Auth/SignUp';
import SignIn from './views/Auth/SignIn';

const Router = () => {
  const { getCurrentUser } = useAuthActions()

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      getCurrentUser()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route element={<SignUp />} path={AUTH_PATHS.REGISTER} />
        <Route element={<SignIn />} path={AUTH_PATHS.LOGIN} />
      </Route>
    </Routes>
  );
};

export default Router;
