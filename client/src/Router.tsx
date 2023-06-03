import { Routes, Route } from 'react-router-dom';
import PublicRoute from './utils/PublicRoute';
import { PATHS, AUTH_PATHS } from './routes';
import Home from './views/Home';
import SignUp from './views/Auth/SignUp';
import SignIn from './views/Auth/SignIn';

const Router = () => {
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
