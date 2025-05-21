import { useEffect, useState } from 'react';

const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!user && !!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
