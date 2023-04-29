import { Routes, Route } from 'react-router-dom';
import { PATHS, AUTH_PATHS } from './routes';
import Home from './views/Home';
import SignUp from './views/Auth/SignUp';
import SignIn from './views/Auth/SignIn';

const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={AUTH_PATHS.REGISTER} element={<SignUp />} />
      <Route path={AUTH_PATHS.LOGIN} element={<SignIn />} />
    </Routes>
  );
};

export default Router;
