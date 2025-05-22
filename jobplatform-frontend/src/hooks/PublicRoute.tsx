import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (user && token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;