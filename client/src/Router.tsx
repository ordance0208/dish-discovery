import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthActions } from './utils/AuthContext/actions';
import { PATHS, AUTH_PATHS } from './routes';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import Home from './views/Home';
import SignUp from './views/Auth/SignUp';
import SignIn from './views/Auth/SignIn';
import ProfileSettings from './views/Profile/ProfileSettings';
import RecipeSubmit from './views/RecipeSubmit';

const Router = () => {
  const { getCurrentUser } = useAuthActions();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getCurrentUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route element={<SignUp />} path={AUTH_PATHS.REGISTER} />
        <Route element={<SignIn />} path={AUTH_PATHS.LOGIN} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<ProfileSettings />} path={PATHS.PROFILE_SETTINGS} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<RecipeSubmit />} path={PATHS.RECIPE_SUBMIT} />
      </Route>
      <Route path={PATHS.PROFILE_SETTINGS} element={<ProfileSettings />} />
    </Routes>
  );
};

export default Router;
