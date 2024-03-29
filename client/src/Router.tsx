import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthActions } from './utils/AuthContext/actions';
import { useAuthData } from './utils/AuthContext/selectors';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import { PATHS, AUTH_PATHS } from './routes';
import SignUp from './views/Auth/SignUp';
import SignIn from './views/Auth/SignIn';
import ProfileSettings from './views/Profile/ProfileSettings';
import RecipeSubmit from './views/RecipeSubmit';
import SpecificRecipe from './views/SpecificRecipe';
import Recipes from './views/Recipes';
import Profile from './views/Profiles/Profile';
import NotFound from './views/NotFound';

const Router = () => {
  const { getCurrentUser } = useAuthActions();
  const { user } = useAuthData();

  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getCurrentUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path='/' element={<Navigate to={PATHS.RECIPES} replace />} />
      <Route
        element={<SpecificRecipe />}
        path={`${PATHS.SPECIFIC_RECIPE}/:id`}
      />
      <Route element={<Recipes />} path={PATHS.RECIPES} />
      <Route element={<PublicRoute />}>
        <Route element={<SignUp />} path={AUTH_PATHS.REGISTER} />
        <Route element={<SignIn />} path={AUTH_PATHS.LOGIN} />
      </Route>
      <Route element={<Profile />} path={`${PATHS.PROFILE}/:id`} />
      {!localStorage.getItem('token') && (
        <Route path='*' element={<NotFound />} />
      )}
      {user ? (
        <>
          <Route element={<PrivateRoute />}>
            <Route element={<Profile />} path={PATHS.PROFILE_ME} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              element={<ProfileSettings />}
              path={PATHS.PROFILE_SETTINGS}
            />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<RecipeSubmit />} path={PATHS.RECIPE_SUBMIT} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              element={<RecipeSubmit />}
              path={`${PATHS.EDIT_RECIPE}/:id`}
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </>
      ) : null}
    </Routes>
  );
};

export default Router;
