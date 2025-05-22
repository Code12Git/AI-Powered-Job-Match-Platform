import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../base/Navbar';

interface RequireAuthProps {
  children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children ? children : <Outlet />}
    </>
  );
};

export default RequireAuth;