// src/hooks/RequireAuth.tsx
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../base/Navbar';

interface RequireAuthProps {
  children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!user || !token) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user, token]);

  if (!user || !token) {
    return null;
  }

  return children ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RequireAuth;