'use client';

import { useEffect, useState } from 'react';

const useAuth = () => {
  const [authState, setAuthState] = useState<{
    user: string | null;
    token: string | null;
    isLoading: boolean;
  }>({
    user: null,
    token: null,
    isLoading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setAuthState({
      user,
      token,
      isLoading: false
    });
  }, []);

  if (authState.isLoading) {
    return { isLoading: true };
  }

  if (!authState.token || !authState.user) {
    return { isAuthenticated: false };
  }

  return {
    isAuthenticated: true,
    user: authState.user,
    token: authState.token,
    isLoading: false
  };
};

export default useAuth;