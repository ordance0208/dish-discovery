import { Routes, Route } from 'react-router-dom';
import SignUp from './views/Auth/SignUp';
import Home from './views/Home';

const Router = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>
  );
};

export default Router;
