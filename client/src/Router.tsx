import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';

const Router = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
    </Routes>
  );
};

export default Router;
