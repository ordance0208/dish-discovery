import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { PATHS } from '../routes';

const PublicRoute = ({ element, path, ...rest }: RouteProps) => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to={PATHS.RECIPES} replace />;
};

export default PublicRoute;
